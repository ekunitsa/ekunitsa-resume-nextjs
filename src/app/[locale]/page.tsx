import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from 'next-intl/server';
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher/LocaleSwitcher';
import { About } from '@/components/pages/home/About/About';
import { Contacts } from '@/components/pages/home/Contacts/Contacts';
import { Experience } from '@/components/pages/home/Experience/Experience';
import { Languages } from '@/components/pages/home/Languages/Languages';
import { Photo } from '@/components/pages/home/Photo/Photo';
import { Skills } from '@/components/pages/home/Skills/Skills';
import { TopInfo } from '@/components/pages/home/TopInfo/TopInfo';
import type { Locale } from '@/types/types';
import styles from './page.module.scss';

interface HomePageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: HomePageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: 'MetaDataT',
    });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export const revalidate = 0;

const HomePage = async ({ params }: HomePageProps) => {
    const { locale } = await params;

    setRequestLocale(locale);

    const { LocaleSwitcherT } = await getMessages();

    return (
        <main className={styles.grid}>
            <div className={styles.photo}>
                <Photo />
            </div>
            <header className={styles.topInfo}>
                <NextIntlClientProvider
                    messages={{
                        LocaleSwitcherT,
                    }}
                >
                    <LocaleSwitcher />
                </NextIntlClientProvider>
                <TopInfo />
            </header>
            <aside className={styles.contacts}>
                <Contacts />
            </aside>
            <section className={styles.about}>
                <About />
            </section>
            <aside className={styles.languages}>
                <Languages />
            </aside>
            <section className={styles.experience}>
                <Experience />
            </section>
            <aside className={styles.skills}>
                <Skills />
            </aside>
        </main>
    );
};

export default HomePage;
