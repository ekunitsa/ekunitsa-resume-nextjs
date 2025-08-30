import { AiOutlineEdit } from 'react-icons/ai';
import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/common/Button/Button';
import { Table } from '@/components/common/Table/Table';
import { Title } from '@/components/common/Title/Title';

import styles from './LanguagesList.module.scss';

import { getLanguagesList } from '@/app/api/actions/languages';

export const LanguagesList = async () => {
    const t = await getTranslations('LanguagesListT');
    const locale = await getLocale();

    const data = await getLanguagesList(locale);

    const extendedData = data
        ? data.map((item) => {
              return {
                  ...item,
                  actions: (
                      <Button href={`/admin/languages/edit/${item.id}`} square>
                          <AiOutlineEdit size={24} />
                      </Button>
                  ),
              };
          })
        : [];

    const header = [
        {
            columnName: 'position',
            tableHeader: t('position'),
            size: 100,
        },
        {
            columnName: 'label',
            tableHeader: t('label'),
        },
        {
            columnName: 'level',
            tableHeader: t('level'),
        },
        {
            columnName: 'actions',
            tableHeader: '',
            size: 48,
        },
    ];

    return (
        <>
            <div className={styles.header}>
                <Title noMarginBottom>{t('title')}</Title>

                <div>
                    <Button href="/admin/languages/add">{t('btnAdd')}</Button>
                </div>
            </div>

            {extendedData && extendedData.length > 0 && (
                <Table data={extendedData} header={header} />
            )}
        </>
    );
};
