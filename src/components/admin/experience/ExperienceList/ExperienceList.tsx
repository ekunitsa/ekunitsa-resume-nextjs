import { AiOutlineEdit } from 'react-icons/ai';
import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/common/Button/Button';
import { Table } from '@/components/common/Table/Table';
import { Title } from '@/components/common/Title/Title';

import styles from './ExperienceList.module.scss';

import { getExperienceList } from '@/app/api/actions/experience';

export const ExperienceList = async () => {
    const t = await getTranslations('ExperienceListT');
    const locale = await getLocale();

    const data = await getExperienceList(locale);

    const extendedData = data
        ? data.map((item) => {
              return {
                  ...item,
                  actions: (
                      <Button href={`/admin/experience/edit/${item.id}`} square>
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
            columnName: 'companyName',
            tableHeader: t('companyName'),
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
                    <Button href="/admin/experience/add">{t('btnAdd')}</Button>
                </div>
            </div>

            {extendedData && extendedData.length > 0 && (
                <Table data={extendedData} header={header} />
            )}
        </>
    );
};
