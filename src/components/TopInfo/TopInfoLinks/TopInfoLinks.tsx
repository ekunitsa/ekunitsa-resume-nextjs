import { useTranslations } from 'next-intl';

import { TopInfoLinksItemI } from '@/types/types';

import TopInfoLinksItem from '../TopInfoLinksItem/TopInfoLinksItem';

import styles from './TopInfoLinks.module.scss';

const TopInfoLinks = () => {
    const t = useTranslations('TopInfoLinksT');

    const links: TopInfoLinksItemI[] = [
        {
            title: t('codewars'),
            link: 'https://www.codewars.com/users/ekunitsa/completed',
            icon: '/static/img/svg/codewars.svg',
        },
        {
            title: t('stackoverflow'),
            link: 'https://ru.stackoverflow.com/users/25785/crus',
            icon: '/static/img/svg/stackoverflow.svg',
        },
        {
            title: t('github'),
            link: 'https://github.com/ekunitsa?tab=repositories',
            icon: '/static/img/svg/github.svg',
        },
        {
            title: t('trailblazer'),
            link: 'https://trailblazer.me/id/crus',
            icon: '/static/img/svg/trailblazer.svg',
        },
    ];

    return (
        <div className={styles.wrapper}>
            {links.map((item) => (
                <TopInfoLinksItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                    icon={item.icon}
                />
            ))}
        </div>
    );
};

export default TopInfoLinks;
