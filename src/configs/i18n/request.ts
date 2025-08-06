import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) as string;

    if (!locale) notFound();

    return {
        locale,
        /* eslint-disable */
        messages: (await import(`@/locales/${locale}.json`)).default,
        /* eslint-enable */
    };
});
