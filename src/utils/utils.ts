import { routing } from '@/configs/i18n/routing';

export const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const getLocaleFromUrl = (pathname: string) =>
    routing.locales.find(
        (locale) =>
            pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    );
