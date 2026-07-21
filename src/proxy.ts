import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './configs/i18n/routing';
import { getLocaleFromUrl } from './utils/utils';

export async function proxy(request: NextRequest) {
    return adminAuthMiddleware(request);
}

const adminAuthMiddleware = async (request: NextRequest) => {
    const url = request.nextUrl.pathname;
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const locale = getLocaleFromUrl(url);
    const localePrefix = locale ? `/${locale}` : '';
    const pathWithoutLocale = locale
        ? url.replace(localePrefix, '') || '/'
        : url;

    const isAdminLoginPath = pathWithoutLocale === '/admin/login';

    if (
        pathWithoutLocale === '/admin' ||
        pathWithoutLocale.startsWith('/admin/')
    ) {
        if (user && isAdminLoginPath) {
            return NextResponse.redirect(
                new URL(`${localePrefix}/admin`, request.nextUrl),
            );
        }

        if (!user && !isAdminLoginPath) {
            return NextResponse.redirect(
                new URL(`${localePrefix}/admin/login`, request.nextUrl),
            );
        }
    }

    return intlMiddleware(request);
};

const intlMiddleware = (request: NextRequest) => {
    const handleI18nRouting = createIntlMiddleware(routing);

    return handleI18nRouting(request);
};

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|.*\\..*).*)',
    ],
};
