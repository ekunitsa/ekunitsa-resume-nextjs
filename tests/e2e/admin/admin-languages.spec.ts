import { expect, test } from './fixtures';
import { cleanupMarkedAdminData } from './utils/admin';
import { confirmDelete, requiredField, submitAdminForm } from './utils/forms';

test.describe('admin languages page', () => {
    test('validates required fields and position', async ({ page }) => {
        await page.goto('/en/admin/languages/add');
        await submitAdminForm(page);
        await expect(page.getByText(requiredField)).toHaveCount(3);

        await page
            .getByLabel('Language*', {
                exact: true,
            })
            .fill('E2E');
        await page
            .getByLabel('Level*', {
                exact: true,
            })
            .fill('Test');
        await page
            .getByLabel('Position*', {
                exact: true,
            })
            .fill('1.5');
        await submitAdminForm(page);
        await expect(page.getByText('Only positive numbers')).toHaveCount(1);
    });

    test('creates, edits and deletes an item', async ({ page }, testInfo) => {
        const marker = `E2E Language ${testInfo.project.name}`;
        const editedMarker = `${marker} edited`;
        const markers = [
            marker,
            editedMarker,
        ];

        await cleanupMarkedAdminData({
            entity: 'languages',
            markers,
        });

        try {
            await page.goto('/en/admin/languages/add');
            await page
                .getByLabel('Language*', {
                    exact: true,
                })
                .fill(marker);
            await page
                .getByLabel('Level*', {
                    exact: true,
                })
                .fill('Test level');
            await page
                .getByLabel('Position*', {
                    exact: true,
                })
                .fill('999');
            await submitAdminForm(page);

            await expect(page).toHaveURL('/en/admin/languages');
            const row = page.getByRole('row').filter({
                hasText: marker,
            });
            await expect(row).toHaveCount(1);
            await row.getByRole('link').click();

            await page
                .getByLabel('Language*', {
                    exact: true,
                })
                .fill(editedMarker);
            await page
                .getByLabel('Level*', {
                    exact: true,
                })
                .fill('Edited test level');
            await page
                .getByLabel('Position*', {
                    exact: true,
                })
                .fill('998');
            await submitAdminForm(page);

            await expect(page).toHaveURL('/en/admin/languages');
            const editedRow = page.getByRole('row').filter({
                hasText: editedMarker,
            });
            await expect(editedRow).toHaveCount(1);
            await expect(editedRow).toContainText('Edited test level');
            await editedRow.getByRole('link').click();

            await confirmDelete(page, true);
            await expect(page).toHaveURL('/en/admin/languages');
            await expect(
                page.getByRole('row').filter({
                    hasText: editedMarker,
                }),
            ).toHaveCount(0);
        } finally {
            await cleanupMarkedAdminData({
                entity: 'languages',
                markers,
            });
        }
    });
});
