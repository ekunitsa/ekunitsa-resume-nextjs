import { ReactNode } from 'react';
import { Session } from 'next-auth';

import Login from '@/components/admin/Login/Login';

interface AdminProviderProps {
    session: Session | null;
    children: ReactNode;
}

const AdminProvider = ({ session, children }: AdminProviderProps) => {
    if (session) {
        return children;
    }

    return <Login />;
};

export default AdminProvider;
