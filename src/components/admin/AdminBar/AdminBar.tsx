'use client';

import { useSession } from 'next-auth/react';

import styles from './AdminBar.module.scss';

const AdminBar = () => {
    const { data: session } = useSession();

    // TODO: Styles, logout

    if (session?.user) {
        return <div className={styles.wrapper}>Logged in</div>;
    }

    return null;
};

export default AdminBar;
