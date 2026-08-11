import { expect, type Locator, type Page } from '@playwright/test';

export const requiredField = 'Required field';

export async function submitAdminForm(page: Page) {
    await page
        .getByRole('button', {
            name: 'Save',
            exact: true,
        })
        .click();
}

export async function expectAdminFormSaved(page: Page) {
    await expect(
        page.getByText('The form has been successfully saved', {
            exact: true,
        }),
    ).toBeVisible();
}

export async function fillFields(fields: Locator[], values: string[]) {
    for (const [index, field] of fields.entries()) {
        await field.fill(values[index]);
    }
}

export async function confirmDelete(page: Page, accept: boolean) {
    page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Are you sure');

        if (accept) {
            await dialog.accept();
        } else {
            await dialog.dismiss();
        }
    });

    await page
        .getByRole('button', {
            name: 'Delete',
            exact: true,
        })
        .click();
}
