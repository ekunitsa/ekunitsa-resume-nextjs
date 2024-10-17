import { useTranslations } from 'next-intl';

import TopInfoLinksItem from '../TopInfoLinksItem/TopInfoLinksItem';

import styles from './TopInfoLinks.module.scss';

const TopInfoLinks = () => {
    const t = useTranslations('TopInfoLinksT');

    return (
        <>
            TopInfoLinks <TopInfoLinksItem />
        </>
    );
};

export default TopInfoLinks;
