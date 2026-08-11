import { expect, test } from './fixtures';
import {
    expectAdminFormSaved,
    fillFields,
    requiredField,
    submitAdminForm,
} from './utils/forms';

test.describe('admin skills page', () => {
    test('requires every field', async ({ page }) => {
        await page.goto('/en/admin/skills');
        const fields = [
            page.getByLabel('Main*', {
                exact: true,
            }),
            page.getByLabel('Secondary*', {
                exact: true,
            }),
            page.getByLabel('AI*', {
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

    test('saves and restores localized skills', async ({ page }) => {
        await page.goto('/en/admin/skills');
        const fields = [
            page.getByLabel('Main*', {
                exact: true,
            }),
            page.getByLabel('Secondary*', {
                exact: true,
            }),
            page.getByLabel('AI*', {
                exact: true,
            }),
        ];
        const initialValues = await Promise.all(
            fields.map((field) => field.inputValue()),
        );
        const temporaryValues = initialValues.map((value) =>
            value ? `${value},E2E_TEST_SKILL` : 'E2E_TEST_SKILL',
        );

        try {
            await fillFields(fields, temporaryValues);
            await submitAdminForm(page);
            await expectAdminFormSaved(page);
            await page.reload();
            await expect(fields[0]).toHaveValue(temporaryValues[0]);
        } finally {
            await page.goto('/en/admin/skills');
            await fillFields(fields, initialValues);
            await submitAdminForm(page);
            await expectAdminFormSaved(page);
        }
    });
});
