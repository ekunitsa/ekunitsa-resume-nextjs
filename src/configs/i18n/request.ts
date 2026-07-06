import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { Locale } from '@/types/types';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) as Locale;

    if (!locale || !routing.locales.includes(locale)) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`@/locales/${locale}.json`)).default,
    };
});
