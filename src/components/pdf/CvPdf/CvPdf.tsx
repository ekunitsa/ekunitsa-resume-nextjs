import { Document, Page, Text, View } from '@react-pdf/renderer';

import type {
    AboutDataListI,
    DashboardI,
    ExperienceDataListI,
    LanguageDataListI,
    Locale,
    MainInformationI,
    SkillsInputI,
    SummaryI,
} from '@/types/types';
import { styles } from './CvPdf.styles';
import { CvPdfAbout } from './CvPdfAbout/CvPdfAbout';
import { CvPdfContacts } from './CvPdfContacts/CvPdfContacts';
import { CvPdfExperience } from './CvPdfExperience/CvPdfExperience';
import { CvPdfFooter } from './CvPdfFooter/CvPdfFooter';
import { CvPdfLanguages } from './CvPdfLanguages/CvPdfLanguages';
import { CvPdfSkills } from './CvPdfSkills/CvPdfSkills';
import { CvPdfSocial } from './CvPdfSocial/CvPdfSocial';
import { CvPdfSummary } from './CvPdfSummary/CvPdfSummary';

interface CvPdfProps {
    locale: Locale;
    websiteUrl: string;
    mainInformation: MainInformationI;
    dashboard: DashboardI;
    about: AboutDataListI[];
    summary: SummaryI;
    experience: ExperienceDataListI[];
    languages: LanguageDataListI[];
    skills: SkillsInputI;
    translations: {
        profile: string;
        summary: string;
        skills: string;
        primary: string;
        secondary: string;
        ai: string;
        experience: string;
        technologies: string;
        languages: string;
        now: string;
        email: string;
        telegram: string;
        linkedin: string;
        website: string;
    };
}

export const CvPdf = ({
    locale,
    websiteUrl,
    mainInformation,
    dashboard,
    about,
    summary,
    experience,
    languages,
    skills,
    translations: t,
}: CvPdfProps) => {
    return (
        <Document
            title={`${mainInformation.name} — CV`}
            author={mainInformation.name}
            subject={mainInformation.role}
            keywords={`${mainInformation.role}, ${skills.primary.join(', ')}`}
            language={locale === 'uk' ? 'uk-UA' : 'en-US'}
            creator={mainInformation.name}
        >
            <Page size="A4" style={styles.page}>
                <CvPdfFooter />
                <View>
                    <Text style={styles.name}>{mainInformation.name}</Text>
                    <Text style={styles.role}>{mainInformation.role}</Text>
                    <CvPdfContacts
                        place={mainInformation.place}
                        dashboard={dashboard}
                        websiteUrl={websiteUrl}
                        labels={{
                            email: t.email,
                            telegram: t.telegram,
                            linkedin: t.linkedin,
                            website: t.website,
                        }}
                    />
                    <CvPdfSocial dashboard={dashboard} />
                </View>
                <CvPdfSummary content={summary.content} title={t.summary} />
                <CvPdfExperience
                    items={experience}
                    locale={locale}
                    title={t.experience}
                    technologiesLabel={t.technologies}
                    currentLabel={t.now}
                />
                <CvPdfSkills
                    skills={skills}
                    title={t.skills}
                    primaryLabel={t.primary}
                    secondaryLabel={t.secondary}
                    aiLabel={t.ai}
                />
                <CvPdfAbout items={about} title={t.profile} />
                <CvPdfLanguages items={languages} title={t.languages} />
            </Page>
        </Document>
    );
};
