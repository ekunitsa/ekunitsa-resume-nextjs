import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient),
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email || '',
                    },
                });

                if (!user?.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials?.password ?? '',
                    user.password,
                );

                if (!isPasswordValid) return null;

                return user;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/admin',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handlerAuth = NextAuth(authOptions);

export { handlerAuth as GET, handlerAuth as POST };
