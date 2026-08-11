import { expect, test } from './fixtures';
import { cleanupMarkedAdminData } from './utils/admin';
import {
    confirmDelete,
    fillFields,
    requiredField,
    submitAdminForm,
} from './utils/forms';

test.describe('admin experience page', () => {
    test('validates required fields and field formats', async ({ page }) => {
        await page.goto('/en/admin/experience/add');
        await submitAdminForm(page);
        await expect(page.getByText(requiredField)).toHaveCount(7);

        await fillFields(
            [
                page.getByLabel('Company*', {
                    exact: true,
                }),
                page.getByLabel('Role*', {
                    exact: true,
                }),
                page.getByLabel('Working hour*', {
                    exact: true,
                }),
                page.getByLabel(/^Start date/),
                page.getByLabel('Description*', {
                    exact: true,
                }),
                page.getByLabel('Technologies*', {
                    exact: true,
                }),
                page.getByLabel('Position*', {
                    exact: true,
                }),
            ],
            [
                'E2E',
                'Tester',
                'Full time',
                'bad-date',
                'Test',
                'Playwright',
                '-2',
            ],
        );
        await page.getByLabel(/^End date/).fill('2026-15-80');
        await submitAdminForm(page);

        await expect(page.getByText('The date is incorrect')).toHaveCount(2);
        await expect(page.getByText('Only positive numbers')).toHaveCount(1);
    });

    test('creates, edits and deletes an item', async ({ page }, testInfo) => {
        const marker = `E2E Company ${testInfo.project.name}`;
        const editedMarker = `${marker} edited`;
        const markers = [
            marker,
            editedMarker,
        ];

        await cleanupMarkedAdminData({
            entity: 'experience',
            markers,
        });

        try {
            await page.goto('/en/admin/experience/add');
            await fillFields(
                [
                    page.getByLabel('Company*', {
                        exact: true,
                    }),
                    page.getByLabel('Role*', {
                        exact: true,
                    }),
                    page.getByLabel('Working hour*', {
                        exact: true,
                    }),
                    page.getByLabel(/^Start date/),
                    page.getByLabel(/^End date/),
                    page.getByLabel('Description*', {
                        exact: true,
                    }),
                    page.getByLabel('Technologies*', {
                        exact: true,
                    }),
                    page.getByLabel('Position*', {
                        exact: true,
                    }),
                ],
                [
                    marker,
                    'E2E Tester',
                    'Full time',
                    '2025-01-01',
                    '2025-12-31',
                    'Created by Playwright',
                    'Playwright, TypeScript',
                    '999',
                ],
            );
            await submitAdminForm(page);

            await expect(page).toHaveURL('/en/admin/experience');
            const row = page.getByRole('row').filter({
                hasText: marker,
            });
            await expect(row).toHaveCount(1);
            await row.getByRole('link').click();

            await page
                .getByLabel('Company*', {
                    exact: true,
                })
                .fill(editedMarker);
            await page
                .getByLabel('Role*', {
                    exact: true,
                })
                .fill('Lead E2E Tester');
            await page.getByLabel(/^End date/).fill('');
            const workNow = page.getByLabel('I am currently working here', {
                exact: true,
            });
            await page
                .getByText('I am currently working here', {
                    exact: true,
                })
                .click();
            await expect(workNow).toBeChecked();
            await page
                .getByLabel('Position*', {
                    exact: true,
                })
                .fill('998');
            await submitAdminForm(page);

            await expect(page).toHaveURL('/en/admin/experience');
            const editedRow = page.getByRole('row').filter({
                hasText: editedMarker,
            });
            await expect(editedRow).toHaveCount(1);
            await editedRow.getByRole('link').click();
            await expect(
                page.getByLabel('I am currently working here', {
                    exact: true,
                }),
            ).toBeChecked();

            await confirmDelete(page, true);
            await expect(page).toHaveURL('/en/admin/experience');
            await expect(
                page.getByRole('row').filter({
                    hasText: editedMarker,
                }),
            ).toHaveCount(0);
        } finally {
            await cleanupMarkedAdminData({
                entity: 'experience',
                markers,
            });
        }
    });
});
