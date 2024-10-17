import { useTranslations } from 'next-intl';

import LanguagesItem from './LanguagesItem/LanguagesItem';

import styles from './Languages.module.scss';

const Languages = () => {
    const t = useTranslations('LanguagesT');

    return (
        <>
            Languages <LanguagesItem />
        </>
    );
};

export default Languages;
