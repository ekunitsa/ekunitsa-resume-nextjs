import { expect, test } from './fixtures';

const adminPages = [
    {
        href: '/en/admin',
        title: 'Dashboard',
    },
    {
        href: '/en/admin/global',
        title: 'General information',
    },
    {
        href: '/en/admin/summary',
        title: 'Summary',
    },
    {
        href: '/en/admin/about',
        title: 'About me',
    },
    {
        href: '/en/admin/experience',
        title: 'Work experience',
    },
    {
        href: '/en/admin/languages',
        title: 'Languages',
    },
    {
        href: '/en/admin/skills',
        title: 'Skills',
    },
] as const;

test.describe('admin navigation', () => {
    test('opens every admin section from the sidebar', async ({ page }) => {
        await expect(
            page.getByText('Menu', {
                exact: true,
            }),
        ).toBeVisible();

        for (const adminPage of adminPages) {
            const link = page.getByRole('link', {
                name: adminPage.title,
                exact: true,
            });

            await expect(link).toHaveAttribute('href', adminPage.href);
            await link.click();
            await expect(page).toHaveURL(new RegExp(`${adminPage.href}$`));
            await expect(
                page
                    .getByText(adminPage.title, {
                        exact: true,
                    })
                    .last(),
            ).toBeVisible();
        }
    });

    test('keeps the current admin section while switching locale', async ({
        page,
    }) => {
        await page.goto('/en/admin/global');
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');

        await page
            .getByRole('button', {
                name: 'UA',
                exact: true,
            })
            .click();
        await expect(page).toHaveURL('/admin/global');
        await expect(page.locator('html')).toHaveAttribute('lang', 'uk');

        await page
            .getByRole('button', {
                name: 'EN',
                exact: true,
            })
            .click();
        await expect(page).toHaveURL('/en/admin/global');
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('exposes home and dashboard shortcuts and has no horizontal overflow', async ({
        page,
    }) => {
        const iconLinks = page.getByRole('link').filter({
            has: page.locator('svg'),
        });
        await expect(iconLinks).toHaveCount(2);
        await expect(iconLinks.nth(0)).toHaveAttribute('href', '/en');
        await expect(iconLinks.nth(1)).toHaveAttribute('href', '/en/admin');

        const hasHorizontalOverflow = await page.evaluate(
            () =>
                document.documentElement.scrollWidth >
                document.documentElement.clientWidth + 1,
        );

        expect(hasHorizontalOverflow).toBe(false);
    });
});
