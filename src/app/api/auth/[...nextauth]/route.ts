import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handlerAuth = NextAuth(authOptions);

export { handlerAuth as GET, handlerAuth as POST };
