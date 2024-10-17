'use client';

import { useTransition } from 'react';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';

import { locales } from '@/configs/config';

import styles from './LocaleSwitcher.module.scss';

import { usePathname, useRouter } from '@/navigations';

const LocaleSwitcher = () => {
    const t = useTranslations('LocaleSwitcherT');
    const currentLocale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    function onSelectChange(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.target as HTMLButtonElement;
        const value = target.value;

        if (value !== currentLocale) {
            startTransition(() => {
                router.replace(pathname, { locale: value });
            });
        }
    }

    return (
        <div className={styles.wrapper}>
            {locales.map((item) => (
                <button
                    key={item}
                    onClick={onSelectChange}
                    value={item}
                    disabled={isPending}
                    className={classNames(styles.button, {
                        [styles.active]: item === currentLocale,
                    })}
                >
                    {t('locale', { locale: item })}
                </button>
            ))}
        </div>
    );
};

export default LocaleSwitcher;
