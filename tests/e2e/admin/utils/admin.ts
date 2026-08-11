import { expect, type Page } from '@playwright/test';
import type {
    CleanupMarkedAdminDataParams,
    MarkedAdminEntity,
} from '../../../types';

export function getE2EAdminCredentials() {
    const email = process.env.E2E_ADMIN_EMAIL;
    const password = process.env.E2E_ADMIN_PASSWORD;

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

    return {
        email,
        password,
    };
}

export async function loginAsAdmin(page: Page) {
    const { email, password } = getE2EAdminCredentials();

    await page.goto('/en/admin/login');
    await page
        .getByLabel('Email', {
            exact: true,
        })
        .fill(email);
    await page
        .getByLabel('Password', {
            exact: true,
        })
        .fill(password);
    await page
        .getByRole('button', {
            name: 'Sign in',
        })
        .click();

    await expect(page).toHaveURL(/\/en\/admin$/);
    await expect(
        page
            .getByText('Dashboard', {
                exact: true,
            })
            .last(),
    ).toBeVisible();
}

const cleanupQueries: Record<MarkedAdminEntity, string> = {
    about: 'DELETE FROM "About" WHERE "description" = ANY($1::text[])',
    experience:
        'DELETE FROM "Experience" WHERE "companyName" = ANY($1::text[])',
    languages: 'DELETE FROM "Languages" WHERE "label" = ANY($1::text[])',
};

export async function cleanupMarkedAdminData({
    entity,
    markers,
}: CleanupMarkedAdminDataParams) {
    if (markers.length === 0) return;

    const { connectToVerifiedTestDatabase } = await import(
        '../../../setup/utils/test-database'
    );
    const { client } = await connectToVerifiedTestDatabase();

    try {
        await client.query(cleanupQueries[entity], [
            markers,
        ]);
    } finally {
        await client.end();
    }
}
