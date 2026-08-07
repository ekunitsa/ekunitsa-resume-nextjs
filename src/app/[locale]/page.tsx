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
import { Summary } from '@/components/pages/home/Summary/Summary';
import { TopInfo } from '@/components/pages/home/TopInfo/TopInfo';
import { routing } from '@/configs/i18n/routing';
import type { Locale } from '@/types/types';
import styles from './page.module.scss';

interface HomePageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

const SITE_URL = new URL(process.env.SITE_URL ?? 'http://localhost:3000');
const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
    en: 'en_US',
    uk: 'uk_UA',
};

export async function generateMetadata({
    params,
}: HomePageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: 'MetaDataT',
    });
    const title = t('title');
    const description = t('description');

    return {
        title,
        description,
        openGraph: {
            type: 'website',
            url: new URL(`/${locale}`, SITE_URL),
            title,
            description,
            siteName: process.env.SITE_NAME ?? 'CV',
            locale: OPEN_GRAPH_LOCALES[locale],
            alternateLocale: routing.locales
                .filter((item) => item !== locale)
                .map((item) => OPEN_GRAPH_LOCALES[item]),
            images: [
                {
                    url: new URL('/static/img/og-image.jpg', SITE_URL),
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
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
            <section className={styles.summary}>
                <Summary />
            </section>
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
