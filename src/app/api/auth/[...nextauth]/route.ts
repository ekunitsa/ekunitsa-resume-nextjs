import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import { NextAuthHandlerParams } from 'next-auth/core';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email || '' },
                });

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials!.password,
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
        signIn: '/admin/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
}) as NextAuthHandlerParams;

export { handler as GET, handler as POST };
