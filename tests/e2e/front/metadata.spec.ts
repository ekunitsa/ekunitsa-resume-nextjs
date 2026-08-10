import { expect, test } from '@playwright/test';

const metadataCases = [
    {
        path: '/en',
        lang: 'en',
        ogLocale: 'en_US',
    },
    {
        path: '/uk',
        lang: 'uk',
        ogLocale: 'uk_UA',
    },
] as const;

for (const metadata of metadataCases) {
    test(`provides ${metadata.lang} metadata`, async ({ page }) => {
        await page.goto(metadata.path);

        await expect(page).toHaveTitle(/.+/);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
            'content',
            /.+/,
        );
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
            'content',
            /.+/,
        );
        await expect(
            page.locator('meta[property="og:description"]'),
        ).toHaveAttribute('content', /.+/);
        await expect(
            page.locator('meta[property="og:locale"]'),
        ).toHaveAttribute('content', metadata.ogLocale);
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
            'content',
            /\/static\/img\/og-image\.jpg$/,
        );
        await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
            'href',
            /\/static\/img\/favicon\.ico/,
        );
    });
}
