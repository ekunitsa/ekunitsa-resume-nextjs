import { useTranslations } from 'next-intl';

import Box from '../Box/Box';

import styles from './Contacts.module.scss';

const Contacts = () => {
    const t = useTranslations('ContactsT');

    return (
        <Box corners={['topLeft']} title={t('title')}>
            Contacts
        </Box>
    );
};

export default Contacts;
