import { connectToVerifiedTestDatabase } from './utils/test-database';

const { client, database, user } = await connectToVerifiedTestDatabase();

try {
    console.log(`Verified isolated test database ${database}/${user}.`);
} finally {
    await client.end();
}
