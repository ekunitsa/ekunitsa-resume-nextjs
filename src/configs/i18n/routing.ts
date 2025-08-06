import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    localePrefix: {
        mode: 'as-needed',
        prefixes: {
            uk: '/uk',
            en: '/en',
        },
    },
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
