import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { connectToVerifiedTestDatabase } from './utils/test-database';

async function main() {
    const { client, database } = await connectToVerifiedTestDatabase();

    try {
        const email = process.env.E2E_ADMIN_EMAIL;
        const password = process.env.E2E_ADMIN_PASSWORD;
        const name = process.env.E2E_ADMIN_NAME || 'E2E Admin';

        if (!email?.endsWith('.test')) {
            throw new Error(
                'E2E_ADMIN_EMAIL is required and must use the reserved .test domain.',
            );
        }

        if (!password || password.length < 12) {
            throw new Error(
                'E2E_ADMIN_PASSWORD must contain at least 12 characters.',
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await client.query(
            `INSERT INTO "User" ("id", "email", "password", "name", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, NOW(), NOW())
             ON CONFLICT ("email") DO UPDATE
             SET "password" = EXCLUDED."password",
                 "name" = EXCLUDED."name",
                 "updatedAt" = NOW()`,
            [
                randomUUID(),
                email,
                passwordHash,
                name,
            ],
        );

        console.log(`E2E admin ${email} is ready in ${database}.`);
    } finally {
        await client.end();
    }
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
