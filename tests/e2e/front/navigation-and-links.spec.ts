import { expect, test } from '@playwright/test';

test('switches the public page between Ukrainian and English', async ({
    page,
}) => {
    await page.goto('/en');

    await page
        .getByRole('button', {
            name: 'UA',
            exact: true,
        })
        .click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
    await expect(page).not.toHaveURL(/\/en(?:\/|$)/);

    await page
        .getByRole('button', {
            name: 'EN',
            exact: true,
        })
        .click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveURL(/\/en(?:\/|$)/);
});

test.describe('public links', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/en');
    });

    test('exposes the downloadable CV link', async ({ page }) => {
        const cvLink = page.getByRole('link', {
            name: 'Download CV',
            exact: true,
        });

        await expect(cvLink).toHaveAttribute('href', /\/en\/cv\.pdf$/);
        expect(await cvLink.getAttribute('download')).not.toBeNull();
    });

    test('uses valid contracts for rendered profile links', async ({
        page,
    }) => {
        const profileLinks = await page
            .locator('main > header a[href]:not([download])')
            .evaluateAll((anchors) =>
                anchors.map((anchor) => ({
                    href: anchor.getAttribute('href'),
                    rel: anchor.getAttribute('rel'),
                    target: anchor.getAttribute('target'),
                    text: anchor.textContent?.trim(),
                })),
            );

        for (const link of profileLinks) {
            expect(link.href).toBeTruthy();
            expect(link.href).toMatch(/^https?:\/\//);
            expect(link.text).toBeTruthy();
            expect(link.target).toBe('_blank');
            expect(link.rel).toContain('noreferrer');
        }
    });

    test('uses valid contracts for rendered contact links', async ({
        page,
    }) => {
        const contactsSidebar = page.locator('main > aside').filter({
            has: page.getByText('Contacts', {
                exact: true,
            }),
        });
        const contactLinks = await contactsSidebar
            .locator('a[href]')
            .evaluateAll((anchors) =>
                anchors.map((anchor) => ({
                    href: anchor.getAttribute('href'),
                    rel: anchor.getAttribute('rel'),
                    target: anchor.getAttribute('target'),
                    text: anchor.textContent?.trim(),
                })),
            );

        await expect(contactsSidebar).toHaveCount(1);

        for (const link of contactLinks) {
            expect(link.href).toMatch(/^(?:https?:\/\/|mailto:)/);
            expect(link.text).toBeTruthy();

            if (link.href?.startsWith('mailto:')) {
                expect(link.target).toBeNull();
                expect(link.rel).toBeNull();
            } else {
                expect(link.target).toBe('_blank');
                expect(link.rel).toContain('noreferrer');
            }
        }
    });
});
