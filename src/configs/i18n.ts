import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale)) notFound();

    return {
        /* eslint-disable */
        messages: (await import(`@/locales/${locale}.json`)).default,
        /* eslint-enable */
    };
});
