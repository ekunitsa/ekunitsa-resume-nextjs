'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { AiOutlineHome, AiOutlineLogout, AiOutlineTool } from 'react-icons/ai';
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher/LocaleSwitcher';
import { Link } from '@/configs/i18n/routing';
import styles from './AdminBar.module.scss';

export const AdminBar = () => {
    const t = useTranslations('AdminBarT');

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
                        type="button"
                        className={styles.buttonLink}
                        aria-label={t('signOut')}
                        onClick={() => signOut()}
                    >
                        <AiOutlineLogout size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};
