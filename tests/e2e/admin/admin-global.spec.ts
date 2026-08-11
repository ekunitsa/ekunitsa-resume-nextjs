import { expect, test } from './fixtures';
import {
    expectAdminFormSaved,
    fillFields,
    requiredField,
    submitAdminForm,
} from './utils/forms';

test.describe('admin global page', () => {
    test('requires every field', async ({ page }) => {
        await page.goto('/en/admin/global');
        const fields = [
            page.getByLabel('Name*', {
                exact: true,
            }),
            page.getByLabel('Role*', {
                exact: true,
            }),
            page.getByLabel('Country of residence*', {
                exact: true,
            }),
        ];

        await fillFields(fields, [
            '',
            '',
            '',
        ]);
        await submitAdminForm(page);

        await expect(page.getByText(requiredField)).toHaveCount(fields.length);
    });

    test('saves and restores localized information', async ({ page }) => {
        await page.goto('/en/admin/global');
        const fields = [
            page.getByLabel('Name*', {
                exact: true,
            }),
            page.getByLabel('Role*', {
                exact: true,
            }),
            page.getByLabel('Country of residence*', {
                exact: true,
            }),
        ];
        const initialValues = await Promise.all(
            fields.map((field) => field.inputValue()),
        );
        const temporaryValues = initialValues.map(
            (value, index) => `${value || `Value ${index}`} [E2E]`,
        );

        try {
            await fillFields(fields, temporaryValues);
            await submitAdminForm(page);
            await expectAdminFormSaved(page);
            await page.reload();
            await expect(fields[0]).toHaveValue(temporaryValues[0]);
        } finally {
            await page.goto('/en/admin/global');
            await fillFields(fields, initialValues);
            await submitAdminForm(page);
            await expectAdminFormSaved(page);
        }
    });
});
