import { expect, test } from './fixtures';
import { cleanupMarkedAdminData } from './utils/admin';
import { confirmDelete, requiredField, submitAdminForm } from './utils/forms';

test.describe('admin about page', () => {
    test('validates required fields and position', async ({ page }) => {
        await page.goto('/en/admin/about/add');
        await submitAdminForm(page);
        await expect(page.getByText(requiredField)).toHaveCount(2);

        await page
            .getByLabel('Description*', {
                exact: true,
            })
            .fill('E2E');
        await page
            .getByLabel('Position*', {
                exact: true,
            })
            .fill('-1');
        await submitAdminForm(page);
        await expect(page.getByText('Only positive numbers')).toHaveCount(1);
    });

    test('creates, edits and deletes an item', async ({ page }, testInfo) => {
        const marker = `E2E About ${testInfo.project.name}`;
        const editedMarker = `${marker} edited`;
        const markers = [
            marker,
            editedMarker,
        ];

        await cleanupMarkedAdminData({
            entity: 'about',
            markers,
        });

        try {
            await page.goto('/en/admin/about');
            await page
                .getByRole('link', {
                    name: 'Add',
                    exact: true,
                })
                .click();
            await page
                .getByLabel('Description*', {
                    exact: true,
                })
                .fill(marker);
            const bold = page.getByLabel('Mark in bold', {
                exact: true,
            });
            await page
                .getByText('Mark in bold', {
                    exact: true,
                })
                .click();
            await expect(bold).toBeChecked();
            await page
                .getByLabel('Position*', {
                    exact: true,
                })
                .fill('999');
            await submitAdminForm(page);

            await expect(page).toHaveURL('/en/admin/about');
            const row = page.getByRole('row').filter({
                hasText: marker,
            });
            await expect(row).toHaveCount(1);
            await row.getByRole('link').click();

            await page
                .getByLabel('Description*', {
                    exact: true,
                })
                .fill(editedMarker);
            await page
                .getByText('Mark in bold', {
                    exact: true,
                })
                .click();
            await expect(bold).not.toBeChecked();
            await page
                .getByLabel('Position*', {
                    exact: true,
                })
                .fill('998');
            await submitAdminForm(page);

            await expect(page).toHaveURL('/en/admin/about');
            const editedRow = page.getByRole('row').filter({
                hasText: editedMarker,
            });
            await expect(editedRow).toHaveCount(1);
            await expect(editedRow.getByRole('cell').first()).toHaveText('998');
            await editedRow.getByRole('link').click();

            await confirmDelete(page, false);
            await expect(page).toHaveURL(/\/en\/admin\/about\/edit\/\d+$/);
            await confirmDelete(page, true);

            await expect(page).toHaveURL('/en/admin/about');
            await expect(
                page.getByRole('row').filter({
                    hasText: editedMarker,
                }),
            ).toHaveCount(0);
        } finally {
            await cleanupMarkedAdminData({
                entity: 'about',
                markers,
            });
        }
    });
});
