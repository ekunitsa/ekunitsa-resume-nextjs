import { renderToBuffer } from '@react-pdf/renderer';
import { getTranslations } from 'next-intl/server';

import { getAboutList } from '@/app/api/actions/about';
import { getDashboard } from '@/app/api/actions/dashboard';
import { getExperienceList } from '@/app/api/actions/experience';
import { getLanguagesList } from '@/app/api/actions/languages';
import { getMainInformation } from '@/app/api/actions/mainInformation';
import { getSkills } from '@/app/api/actions/skills';
import { getSummary } from '@/app/api/actions/summary';
import { CvPdf } from '@/components/pdf/CvPdf/CvPdf';
import type { Locale } from '@/types/types';

interface CvRouteProps {
    params: Promise<{
        locale: Locale;
    }>;
}

let pdfRenderQueue = Promise.resolve();

const renderPdfSequentially = async (render: () => Promise<Buffer>) => {
    const previousRender = pdfRenderQueue;
    let finishRender = () => {};

    pdfRenderQueue = new Promise<void>((resolve) => {
        finishRender = resolve;
    });

    await previousRender;

    try {
        return await render();
    } finally {
        finishRender();
    }
};

export async function GET(_request: Request, { params }: CvRouteProps) {
    try {
        const { locale } = await params;
        const mainInformation = await getMainInformation(locale);
        const dashboard = await getDashboard();
        const about = await getAboutList(locale);
        const summary = await getSummary(locale);
        const experience = await getExperienceList(locale);
        const languages = await getLanguagesList(locale);
        const skills = await getSkills(locale);
        const t = await getTranslations({
            locale,
            namespace: 'CvPdfT',
        });

        if (
            !mainInformation ||
            !dashboard ||
            !about ||
            !experience ||
            !languages ||
            !skills ||
            !summary
        ) {
            return new Response(null, {
                status: 404,
            });
        }

        const pdf = await renderPdfSequentially(() =>
            renderToBuffer(
                <CvPdf
                    locale={locale}
                    mainInformation={mainInformation}
                    dashboard={dashboard}
                    about={about}
                    summary={summary}
                    experience={experience}
                    languages={languages}
                    skills={skills}
                    translations={{
                        profile: t('profile'),
                        summary: t('summary'),
                        skills: t('skills'),
                        primary: t('primary'),
                        secondary: t('secondary'),
                        ai: t('ai'),
                        experience: t('experience'),
                        technologies: t('technologies'),
                        languages: t('languages'),
                        now: t('now'),
                    }}
                />,
            ),
        );
        const fileName = `eKunitsa-Senior-FE-Dev-CV-${locale}.pdf`;

        return new Response(new Uint8Array(pdf), {
            headers: {
                'Cache-Control': 'no-store',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': 'application/pdf',
            },
        });
    } catch (error) {
        console.error(error);

        return new Response('Failed to generate CV', {
            status: 500,
        });
    }
}
