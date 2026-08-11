import { test as base } from '@playwright/test';
import type { AdminWorkerFixtures } from '../../types';
import { loginAsAdmin } from './utils/admin';

export const test = base.extend<Record<never, never>, AdminWorkerFixtures>({
    adminStorageState: [
        async ({ browser }, use, workerInfo) => {
            const baseURL = workerInfo.project.use.baseURL;

            if (typeof baseURL !== 'string') {
                throw new Error('The admin fixture requires a string baseURL.');
            }

            const context = await browser.newContext({
                baseURL,
            });

            try {
                const page = await context.newPage();

                await loginAsAdmin(page);
                await use(await context.storageState());
            } finally {
                await context.close();
            }
        },
        {
            scope: 'worker',
        },
    ],
    storageState: async ({ adminStorageState }, use) => {
        await use(adminStorageState);
    },
    page: async ({ page }, use) => {
        await page.goto('/en/admin');
        await use(page);
    },
});

export { expect } from '@playwright/test';
