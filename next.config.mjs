import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/configs/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    serverExternalPackages: [
        '@prisma/client',
        'pg',
    ],
    sassOptions: {
        loadPaths: [
            path.join(process.cwd(), 'src'),
        ],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.ekunitsa.com',
                pathname: '/**',
            },
        ],
    },

    turbopack: {
        rules: {
            '*.svg': {
                loaders: [
                    '@svgr/webpack',
                ],
                as: '*.js',
            },
        },
    },
};

export default withNextIntl(nextConfig);
