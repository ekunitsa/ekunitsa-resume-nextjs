import { connectToVerifiedTestDatabase } from './utils/test-database';

export default async function globalSetup() {
    const { client, database, user } = await connectToVerifiedTestDatabase();

    try {
        const adminEmail = process.env.E2E_ADMIN_EMAIL;

        if (!adminEmail?.endsWith('.test')) {
            throw new Error(
                'E2E_ADMIN_EMAIL is required and must use the reserved .test domain.',
            );
        }

        const result = await client.query(
            'SELECT EXISTS(SELECT 1 FROM "User" WHERE "email" = $1) AS exists',
            [
                adminEmail,
            ],
        );

        if (!result.rows[0].exists) {
            throw new Error(
                'The E2E admin does not exist. Run npm run test:e2e:prepare-admin.',
            );
        }

        console.log(`Verified isolated test database ${database}/${user}.`);
    } finally {
        await client.end();
    }
}
