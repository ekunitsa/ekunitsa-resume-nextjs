import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { LocaleSwitcher } from '@/components/common/LocaleSwitcher/LocaleSwitcher';
import { About } from '@/components/pages/home/About/About';
import { Contacts } from '@/components/pages/home/Contacts/Contacts';
import { Experience } from '@/components/pages/home/Experience/Experience';
import { Languages } from '@/components/pages/home/Languages/Languages';
import { Photo } from '@/components/pages/home/Photo/Photo';
import { Skills } from '@/components/pages/home/Skills/Skills';
import { TopInfo } from '@/components/pages/home/TopInfo/TopInfo';

import { Locale } from '@/types/types';

import styles from './page.module.scss';

interface HomePageProps {
    params: {
        locale: Locale;
    };
}

export async function generateMetadata({ params: { locale } }: HomePageProps) {
    const t = await getTranslations({ locale, namespace: 'MetaDataT' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export const revalidate = 0;

const HomePage = ({ params: { locale } }: HomePageProps) => {
    setRequestLocale(locale);

    const { LocaleSwitcherT } = useMessages();

    return (
        <div className={styles.grid}>
            <div className={styles.photo}>
                <Photo />
            </div>
            <div className={styles.topInfo}>
                <NextIntlClientProvider
                    messages={{
                        LocaleSwitcherT,
                    }}
                >
                    <LocaleSwitcher />
                </NextIntlClientProvider>
                <TopInfo />
            </div>
            <div className={styles.contacts}>
                <Contacts />
            </div>
            <div className={styles.about}>
                <About />
            </div>
            <div className={styles.languages}>
                <Languages />
            </div>
            <div className={styles.experience}>
                <Experience />
            </div>
            <div className={styles.skills}>
                <Skills />
            </div>
        </div>
    );
};

export default HomePage;
