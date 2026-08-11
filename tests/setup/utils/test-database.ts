import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';
import { Client } from 'pg';

const TEST_SUFFIX = '_test';

export function loadTestDatabaseConfig() {
    const envPath = resolve(process.cwd(), '.env.test');
    const result = loadEnv({
        path: envPath,
        override: true,
        quiet: true,
    });

    if (result.error) {
        throw new Error(
            `Missing ${envPath}. Copy .env.test.example to .env.test first.`,
        );
    }

    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL is required.');
    }

    const parsedUrl = new URL(connectionString);
    const urlDatabase = decodeURIComponent(parsedUrl.pathname.slice(1));
    const urlUser = decodeURIComponent(parsedUrl.username);

    if (!urlDatabase.endsWith(TEST_SUFFIX)) {
        throw new Error(
            'The database name in DATABASE_URL must end with _test.',
        );
    }

    if (!urlUser.endsWith(TEST_SUFFIX)) {
        throw new Error(
            'The database user in DATABASE_URL must end with _test.',
        );
    }

    return {
        connectionString,
        expectedDatabase: urlDatabase,
        expectedUser: urlUser,
    };
}

export async function connectToVerifiedTestDatabase() {
    const config = loadTestDatabaseConfig();
    const client = new Client({
        connectionString: config.connectionString,
        connectionTimeoutMillis: 7_000,
    });

    await client.connect();

    try {
        const result = await client.query(
            'SELECT current_database() AS database, current_user AS user',
        );
        const actual = result.rows[0];

        if (
            actual.database !== config.expectedDatabase ||
            actual.user !== config.expectedUser
        ) {
            throw new Error(
                `Connected to unexpected database identity: ${actual.database}/${actual.user}.`,
            );
        }

        return {
            client,
            database: config.expectedDatabase,
            user: config.expectedUser,
        };
    } catch (error) {
        await client.end();
        throw error;
    }
}
