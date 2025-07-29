'use client';

import { AiOutlineEdit, AiOutlineHome, AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';

import styles from './AdminBar.module.scss';

const AdminBar = () => {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <div className={styles.links}>
                        <Link href="/" className={styles.link}>
                            <AiOutlineHome size={24} />
                        </Link>
                        <Link href="/admin" className={styles.link}>
                            <AiOutlineEdit size={24} />
                        </Link>
                    </div>
                    <div className={styles.buttons}>
                        <LocaleSwitcher />
                        <button
                            className={styles.buttonLink}
                            onClick={() => signOut()}
                        >
                            <AiOutlineLogout size={24} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default AdminBar;
