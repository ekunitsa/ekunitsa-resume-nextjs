import { expect, test } from './fixtures';
import {
    expectAdminFormSaved,
    requiredField,
    submitAdminForm,
} from './utils/forms';

test.describe('admin summary page', () => {
    test('requires content', async ({ page }) => {
        await page.goto('/en/admin/summary');
        await page
            .getByLabel('Content*', {
                exact: true,
            })
            .fill('');
        await submitAdminForm(page);

        await expect(page.getByText(requiredField)).toHaveCount(1);
    });

    test('saves and restores localized content', async ({ page }) => {
        await page.goto('/en/admin/summary');
        const content = page.getByLabel('Content*', {
            exact: true,
        });
        const initialValue = await content.inputValue();
        const temporaryValue = `${initialValue}<p>E2E temporary summary</p>`;

        try {
            await content.fill(temporaryValue);
            await submitAdminForm(page);
            await expectAdminFormSaved(page);
            await page.reload();
            await expect(content).toHaveValue(temporaryValue);
        } finally {
            await page.goto('/en/admin/summary');
            await content.fill(initialValue);
            await submitAdminForm(page);
            await expectAdminFormSaved(page);
        }
    });
});
