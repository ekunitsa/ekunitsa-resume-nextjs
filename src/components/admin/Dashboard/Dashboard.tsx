import { useTranslations } from 'next-intl';

import { Box } from '@/components/common/Box/Box';
import { Checkbox } from '@/components/form/Checkbox/Checkbox';
import { Textarea } from '@/components/form/Textarea/Textarea';

export const Dashboard = () => {
    const t = useTranslations('DashboardT');

    return (
        <Box title={t('title')} corners={['bottomLeft', 'topRight']}>
            {/* <p>{t('description')}</p> */}
            <Textarea label="label test" name="name" />
            <Checkbox label="label test" name="name" />
        </Box>
    );
};
