'use client';

import { ReactNode } from 'react';

import SessionWrapper from '@/components/SessionWrapper/SessionWrapper';

interface AdminLayoutProps {
    children: ReactNode;
}
export default function AdminLayout({ children }: AdminLayoutProps) {
    return <SessionWrapper>{children}</SessionWrapper>;
}
