'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Checkbox } from '@/components/form/Checkbox/Checkbox';
import { Input } from '@/components/form/Input/Input';

import { datePattern } from '@/utils/patterns';

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
        setValue,
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
        <>
            <Title noMarginBottom>{t('title')}</Title>
            <p>{t('description')}</p>
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

                <Input
                    label={t('startWorkDate')}
                    type="text"
                    defaultValue={
                        data && data.startWorkDate ? data.startWorkDate : ''
                    }
                    errorMessage={errors?.startWorkDate?.message as string}
                    setValue={setValue}
                    {...register('startWorkDate', {
                        pattern: {
                            value: datePattern,
                            message: formT('errorDatePattern'),
                        },
                    })}
                />

                <Input
                    label={t('birthdayDate')}
                    type="text"
                    defaultValue={
                        data && data.birthdayDate ? data.birthdayDate : ''
                    }
                    errorMessage={errors?.birthdayDate?.message as string}
                    setValue={setValue}
                    {...register('birthdayDate', {
                        pattern: {
                            value: datePattern,
                            message: formT('errorDatePattern'),
                        },
                    })}
                />

                <Checkbox
                    label={t('showAge')}
                    defaultChecked={data?.showAge}
                    {...register('showAge')}
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
        </>
    );
};
