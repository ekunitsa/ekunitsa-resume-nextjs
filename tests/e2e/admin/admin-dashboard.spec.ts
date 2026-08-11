import { expect, test } from './fixtures';
import { expectAdminFormSaved, submitAdminForm } from './utils/forms';

test.describe('admin dashboard page', () => {
    test('validates dates, email and Telegram URL', async ({ page }) => {
        await page.goto('/en/admin');
        await page.getByLabel(/^Date of beginning of work/).fill('2026-99-99');
        await page.getByLabel(/^Birthday/).fill('not-a-date');
        await page
            .getByLabel('Email', {
                exact: true,
            })
            .fill('wrong-email');
        await page.getByLabel(/^Telegram/).fill('https://example.com/user');
        await submitAdminForm(page);

        await expect(page.getByText('The date is incorrect')).toHaveCount(2);
        await expect(page.getByText('The email is incorrect')).toHaveCount(1);
        await expect(page.getByText('The telegram is incorrect')).toHaveCount(
            1,
        );
    });

    test('saves and restores the open-to-work checkbox', async ({ page }) => {
        await page.goto('/en/admin');
        const checkbox = page.getByLabel('Open to work', {
            exact: true,
        });
        const initialValue = await checkbox.isChecked();

        const checkboxLabel = page.getByText('Open to work', {
            exact: true,
        });

        await checkboxLabel.click();
        await submitAdminForm(page);
        await expectAdminFormSaved(page);
        await page.reload();
        await expect(checkbox).toBeChecked({
            checked: !initialValue,
        });

        await checkboxLabel.click();
        await submitAdminForm(page);
        await expectAdminFormSaved(page);
    });
});
