'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Input } from '@/components/form/Input/Input';

import { MainInformationI } from '@/types/types';

import styles from './GlobalForm.module.scss';

import { postPatchMainInformation } from '@/app/api/actions/mainInformation';

interface GlobalFormProps {
    data: MainInformationI | null;
}

export const GlobalForm = ({ data }: GlobalFormProps) => {
    const t = useTranslations('GlobalFormT');
    const formT = useTranslations('FormT');
    const locale = useLocale();
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

    const onSubmit = async (formData: MainInformationI) => {
        const { name, role, place } = formData;

        const response = await postPatchMainInformation({
            language: locale,
            name,
            role,
            place,
        });

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
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                noValidate
            >
                <Input
                    label={`${t('name')}*`}
                    type="text"
                    defaultValue={data && data.name ? data.name : ''}
                    errorMessage={errors?.name?.message as string}
                    setValue={setValue}
                    {...register('name', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('role')}*`}
                    type="text"
                    defaultValue={data && data.role ? data.role : ''}
                    errorMessage={errors?.role?.message as string}
                    setValue={setValue}
                    {...register('role', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('place')}*`}
                    type="text"
                    defaultValue={data && data.place ? data.place : ''}
                    errorMessage={errors?.place?.message as string}
                    setValue={setValue}
                    {...register('place', {
                        required: formT('errorRequiredField'),
                    })}
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
