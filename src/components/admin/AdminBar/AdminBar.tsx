'use client';

import { AiOutlineHome, AiOutlineLogout, AiOutlineTool } from 'react-icons/ai';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import LocaleSwitcher from '@/components/common/LocaleSwitcher/LocaleSwitcher';

import styles from './AdminBar.module.scss';

const AdminBar = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>
                        <AiOutlineHome size={24} />
                    </Link>
                    <Link href="/admin" className={styles.link}>
                        <AiOutlineTool size={24} />
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
};

export default AdminBar;
