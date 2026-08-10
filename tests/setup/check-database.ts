import { connectToVerifiedTestDatabase } from './utils/test-database';

async function main() {
    const { client, database, user } = await connectToVerifiedTestDatabase();

    try {
        console.log(`Verified isolated test database ${database}/${user}.`);
    } finally {
        await client.end();
    }
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
