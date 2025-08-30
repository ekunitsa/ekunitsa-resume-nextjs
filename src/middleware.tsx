import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';

import { routing } from './configs/i18n/routing';

export const middleware = (request: NextRequest) => {
    return adminAuthMiddleware(request);
};

const adminAuthMiddleware = async (request: NextRequest) => {
    const url = request.nextUrl.pathname;
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (url.includes('/admin')) {
        if (user && url.includes('/admin/login')) {
            return NextResponse.redirect(new URL('/admin', request.nextUrl));
        }

        if (!user && !url.includes('/admin/login')) {
            return NextResponse.redirect(
                new URL('/admin/login', request.nextUrl),
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
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
