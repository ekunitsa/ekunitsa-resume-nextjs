// biome-ignore-all lint/security/noDangerouslySetInnerHtml: Summary HTML is sanitized with DOMPurify on write and before rendering
import { getLocale, getTranslations } from 'next-intl/server';
import { getSummary } from '@/app/api/actions/summary';
import { Box } from '@/components/common/Box/Box';
import { sanitizeHtml } from '@/utils/sanitizeHtml';
import styles from './Summary.module.scss';

export const Summary = async () => {
    const locale = await getLocale();
    const t = await getTranslations('SummaryT');
    const data = await getSummary(locale);

    if (!data?.content) {
        return null;
    }

    const content = sanitizeHtml(data.content);

    if (content) {
        return (
            <Box
                corners={[
                    'topLeft',
                    'bottomRight',
                ]}
                title={t('title')}
            >
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </Box>
        );
    }
};
