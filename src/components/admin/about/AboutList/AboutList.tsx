import { AiOutlineEdit } from 'react-icons/ai';
import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/common/Button/Button';
import { Table } from '@/components/common/Table/Table';
import { Title } from '@/components/common/Title/Title';

import styles from './AboutList.module.scss';

import { getAboutList } from '@/app/api/actions/about';

export const AboutList = async () => {
    const t = await getTranslations('AboutListT');
    const locale = await getLocale();

    const data = await getAboutList(locale);

    const extendedData = data
        ? data.map((item) => {
              return {
                  ...item,
                  actions: (
                      <Button href={`/admin/about/edit/${item.id}`} square>
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
            columnName: 'description',
            tableHeader: t('description'),
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
                    <Button href="/admin/about/add">{t('btnAdd')}</Button>
                </div>
            </div>

            {extendedData && extendedData.length > 0 && (
                <Table data={extendedData} header={header} />
            )}
        </>
    );
};
