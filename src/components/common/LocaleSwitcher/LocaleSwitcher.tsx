'use client';

import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { Fragment, useTransition } from 'react';

import { routing, usePathname, useRouter } from '@/configs/i18n/routing';

import styles from './LocaleSwitcher.module.scss';

export const LocaleSwitcher = () => {
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
                router.replace(pathname, {
                    locale: value,
                });
            });
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                {routing.locales.map((item, index) => (
                    <Fragment key={item}>
                        <button
                            onClick={onSelectChange}
                            value={item}
                            type="button"
                            disabled={isPending}
                            className={classNames(styles.button, {
                                [styles.active]: item === currentLocale,
                            })}
                        >
                            {t('locale', {
                                locale: item,
                            })}
                        </button>

                        {index === 0 && (
                            <div className={styles.separator}></div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
