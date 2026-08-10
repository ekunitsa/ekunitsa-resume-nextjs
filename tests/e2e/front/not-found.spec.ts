import { expect, test } from '@playwright/test';

test('renders localized 404 page and returns home', async ({ page }) => {
    const response = await page.goto('/en/page-that-does-not-exist');

    expect(response?.status()).toBe(404);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        /.+/,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        /noindex/,
    );

    const homeLink = page.getByRole('link');

    await expect(homeLink).toHaveCount(1);
    await homeLink.click();

    await expect(page).toHaveURL(/\/en(?:\/|$)/);
});
