import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './Photo.module.scss';

const Photo = () => {
    const t = useTranslations('PhotoT');

    return (
        <>
            <Image
                src="/static/img/eugine.jpg"
                width={400}
                height={538}
                className={styles.image}
                alt={t('alt')}
                priority
            />
        </>
    );
};

export default Photo;
