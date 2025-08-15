import { useTranslations } from 'next-intl';

import { Box } from '@/components/common/Box/Box';

export const Dashboard = () => {
    const t = useTranslations('DashboardT');

    return (
        <Box title={t('title')} corners={['bottomLeft', 'topRight']}>
            <p>{t('description')}</p>
        </Box>
    );
};
