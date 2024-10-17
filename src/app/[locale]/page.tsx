import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import About from '@/components/About/About';
import Contacts from '@/components/Contacts/Contacts';
import Experience from '@/components/Experience/Experience';
import Languages from '@/components/Languages/Languages';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import Photo from '@/components/Photo/Photo';
import Skills from '@/components/Skills/Skills';
import TopInfo from '@/components/TopInfo/TopInfo';

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

const HomePage = ({ params: { locale } }: HomePageProps) => {
    unstable_setRequestLocale(locale);

    const { LocaleSwitcherT } = useMessages();

    return (
        <div className={styles.wrapper}>
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
                    <TopInfo open />
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
        </div>
    );
};

export default HomePage;
