import { expect, test } from '@playwright/test';
import type { LocaleCase } from '../../types';

const locales: LocaleCase[] = [
    {
        path: '/en',
        lang: 'en',
        sections: [
            'Summary',
            'Contacts',
            'About me',
            'Languages',
            'Work experience',
            'Skills',
        ],
        skillGroups: [
            'Main',
            'Secondary',
            'AI',
        ],
    },
    {
        path: '/uk',
        lang: 'uk',
        sections: [
            'Резюме',
            'Контакти',
            'Про мене',
            'Мови',
            'Досвід роботи',
            'Навички',
        ],
        skillGroups: [
            'Основні',
            'Додаткові',
            'ШІ',
        ],
    },
];

for (const locale of locales) {
    test.describe(`${locale.lang} public home`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(locale.path);
        });

        test('renders the public home page', async ({ page }) => {
            await expect(page.locator('html')).toHaveAttribute(
                'lang',
                locale.lang,
            );
            await expect(page.locator('main')).toBeVisible();
        });

        test('renders translated resume sections', async ({ page }) => {
            for (const title of locale.sections) {
                await expect(
                    page
                        .getByText(title, {
                            exact: true,
                        })
                        .first(),
                ).toBeVisible();
            }

            for (const group of locale.skillGroups) {
                await expect(
                    page
                        .getByText(group, {
                            exact: true,
                        })
                        .first(),
                ).toBeVisible();
            }
        });

        test('loads images and describes the profile photo', async ({
            page,
        }) => {
            const images = page.locator('main img');
            const imageCount = await images.count();

            expect(imageCount).toBeGreaterThan(0);

            for (let index = 0; index < imageCount; index += 1) {
                const image = images.nth(index);

                await expect(image).toBeVisible();
                await expect(image).toHaveAttribute('alt');
                await expect
                    .poll(() =>
                        image.evaluate(
                            (element: HTMLImageElement) =>
                                element.complete && element.naturalWidth > 0,
                        ),
                    )
                    .toBe(true);
            }

            await expect(
                page.locator('main img[src*="photo.png"]'),
            ).not.toHaveAttribute('alt', '');
        });

        test('fits the current viewport without horizontal overflow', async ({
            page,
        }) => {
            const hasHorizontalOverflow = await page.evaluate(
                () =>
                    document.documentElement.scrollWidth >
                    document.documentElement.clientWidth + 1,
            );

            expect(hasHorizontalOverflow).toBe(false);
        });
    });
}
