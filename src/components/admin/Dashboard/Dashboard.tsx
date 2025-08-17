'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Box } from '@/components/common/Box/Box';
import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Checkbox } from '@/components/form/Checkbox/Checkbox';

import { DashboardI } from '@/types/types';

import styles from './Dashboard.module.scss';

import { postPatchDashboard } from '@/app/api/actions/dashboard';

interface DashboardProps {
    data: DashboardI | null;
}

export const Dashboard = ({ data }: DashboardProps) => {
    const t = useTranslations('DashboardT');
    const formT = useTranslations('FormT');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onSubmit',
    });

    const onSubmit = async (formData: DashboardI) => {
        const response = await postPatchDashboard(formData);

        if (response.ok) {
            router.refresh();
        } else {
            setError('root.serverError', {
                message: formT('errorServerActionFailed'),
            });
        }
    };

    return (
        <Box corners={['bottomLeft', 'topRight']} className={styles.wrapper}>
            <Title noMarginBottom>{t('title')}</Title>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                noValidate
            >
                <Checkbox
                    label={t('openToWork')}
                    defaultChecked={data?.openToWork}
                    {...register('openToWork')}
                />

                <div className={styles.buttons}>
                    <Button
                        buttonType="submit"
                        className={styles.button}
                        disabled={isSubmitting}
                    >
                        {formT('saveBtn')}
                    </Button>
                </div>

                {errors?.root?.serverError.message && (
                    <p className={styles.errorMessage}>
                        {errors?.root?.serverError.message}
                    </p>
                )}
            </form>
        </Box>
    );
};
