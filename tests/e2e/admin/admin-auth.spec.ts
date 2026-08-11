import { expect, test } from '@playwright/test';
import { getE2EAdminCredentials, loginAsAdmin } from './utils/admin';

test.describe('admin authentication', () => {
    test('redirects anonymous users from protected admin routes', async ({
        page,
    }) => {
        for (const { path, expectedPath } of [
            {
                path: '/en/admin',
                expectedPath: '/en/admin/login',
            },
            {
                path: '/en/admin/skills',
                expectedPath: '/en/admin/login',
            },
            {
                path: '/uk/admin',
                expectedPath: '/admin/login',
            },
        ]) {
            await page.goto(path);
            await expect(page).toHaveURL(expectedPath);
        }
    });

    test('renders an accessible login form and validates required fields', async ({
        page,
    }) => {
        await page.goto('/en/admin/login');

        await expect(
            page.getByText('Admin Panel', {
                exact: true,
            }),
        ).toBeVisible();

        const email = page.getByLabel('Email', {
            exact: true,
        });
        const password = page.getByLabel('Password', {
            exact: true,
        });

        await expect(email).toHaveAttribute('type', 'email');
        await expect(password).toHaveAttribute('type', 'password');
        await expect(
            page.getByRole('button', {
                name: 'Sign in',
                exact: true,
            }),
        ).toHaveAttribute('type', 'submit');

        await page
            .getByRole('button', {
                name: 'Sign in',
            })
            .click();

        await expect(page.getByText('Required field')).toHaveCount(2);
        await expect(page).toHaveURL('/en/admin/login');
    });

    test('rejects invalid credentials without creating a session', async ({
        page,
    }) => {
        const { email } = getE2EAdminCredentials();

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
            .fill('definitely-wrong-password');
        await page
            .getByRole('button', {
                name: 'Sign in',
            })
            .click();

        await expect(
            page.getByText('Something is not listed correctly :(', {
                exact: true,
            }),
        ).toBeVisible();
        await expect(page).toHaveURL('/en/admin/login');

        const sessionCookies = (await page.context().cookies()).filter(
            ({ name }) => name.includes('next-auth.session-token'),
        );
        expect(sessionCookies).toEqual([]);
    });

    test('signs in, persists the session and redirects away from login', async ({
        page,
    }) => {
        await loginAsAdmin(page);

        const sessionCookies = (await page.context().cookies()).filter(
            ({ name }) => name.includes('next-auth.session-token'),
        );
        expect(sessionCookies).toHaveLength(1);
        expect(sessionCookies[0].httpOnly).toBe(true);
        expect(sessionCookies[0].sameSite).toBe('Lax');

        await page.reload();
        await expect(page).toHaveURL('/en/admin');

        await page.goto('/en/admin/login');
        await expect(page).toHaveURL('/en/admin');
    });

    test('signs out and revokes access to protected pages', async ({
        page,
    }) => {
        await loginAsAdmin(page);

        await page
            .getByRole('button', {
                name: 'Sign out',
                exact: true,
            })
            .click();

        await expect(page).toHaveURL('/en/admin/login');

        await page.goto('/en/admin/skills');
        await expect(page).toHaveURL('/en/admin/login');
    });
});
