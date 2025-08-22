'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/common/Button/Button';
import { Table } from '@/components/common/Table/Table';
import { Title } from '@/components/common/Title/Title';

import styles from './LanguagesList.module.scss';

// const data = [
//     {
//         firstName: 'tanner',
//         lastName: 'linsley',
//         age: 24,
//     },
//     {
//         firstName: 'tandy',
//         lastName: 'miller',
//         age: 40,
//     },
//     {
//         firstName: 'joe',
//         lastName: 'dirte',
//         age: <Button href="/">test</Button>,
//     },
// ];

// const header = [
//     {
//         columnName: 'firstName',
//         tableHeader: 'TH1',
//     },
//     {
//         columnName: 'lastName',
//         tableHeader: 'TH2',
//     },
//     {
//         columnName: 'age',
//         tableHeader: 'TH3',
//     },
// ];

export const LanguagesList = () => {
    const t = useTranslations('LanguagesListT');

    return (
        <>
            <Title noMarginBottom>{t('title')}</Title>
            {/* <Table data={data} header={header} /> */}
        </>
    );
};
