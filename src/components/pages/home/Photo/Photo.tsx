import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './Photo.module.scss';

export const Photo = () => {
    const t = useTranslations('PhotoT');

    return (
        <>
            <Image
                src="/static/img/eugine.png"
                width={400}
                height={538}
                className={styles.image}
                alt={t('alt')}
                priority
            />
        </>
    );
};
