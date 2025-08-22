import Image from 'next/image';
import { getLocale } from 'next-intl/server';

import styles from './Photo.module.scss';

import { getMainInformation } from '@/app/api/actions/mainInformation';

export const Photo = async () => {
    const locale = await getLocale();
    const mainInformation = await getMainInformation(locale);

    return (
        <>
            <Image
                src="/static/img/eugine.png"
                width={400}
                height={538}
                className={styles.image}
                alt={mainInformation?.name || ''}
                priority
            />
        </>
    );
};
