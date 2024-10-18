import { useTranslations } from 'next-intl';

import Box from '../Box/Box';

import LanguagesItem from './LanguagesItem/LanguagesItem';

import styles from './Languages.module.scss';

const Languages = () => {
    const t = useTranslations('LanguagesT');

    return (
        <Box corners={['topRight']} title={t('title')}>
            <LanguagesItem />
        </Box>
    );
};

export default Languages;
