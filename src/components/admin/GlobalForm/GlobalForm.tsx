'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { postPatchMainInformation } from '@/app/api/actions/mainInformation';
import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Input } from '@/components/form/Input/Input';
import type { MainInformationI } from '@/types/types';
import { ResponseStatus } from '../ResponseStatus/ResponseStatus';
import styles from './GlobalForm.module.scss';

interface GlobalFormProps {
    data: MainInformationI | null;
}

export const GlobalForm = ({ data }: GlobalFormProps) => {
    const t = useTranslations('GlobalFormT');
    const formT = useTranslations('FormT');
    const locale = useLocale();
    const router = useRouter();
    const [successResponse, setSuccessResponse] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onSubmit',
    });

    const onSubmit = async (formData: MainInformationI) => {
        clearErrors('root.serverError');

        const { name, role, place } = formData;

        const response = await postPatchMainInformation({
            language: locale,
            name,
            role,
            place,
        });

        if (response.ok) {
            setSuccessResponse(true);

            setTimeout(() => {
                setSuccessResponse(false);
            }, 3000);

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
                    defaultValue={data?.name ? data.name : ''}
                    errorMessage={errors?.name?.message as string}
                    setValue={setValue}
                    {...register('name', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('role')}*`}
                    type="text"
                    defaultValue={data?.role ? data.role : ''}
                    errorMessage={errors?.role?.message as string}
                    setValue={setValue}
                    {...register('role', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('place')}*`}
                    type="text"
                    defaultValue={data?.place ? data.place : ''}
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

                {(errors?.root?.serverError.message || successResponse) && (
                    <ResponseStatus
                        status={successResponse ? 'success' : 'error'}
                    >
                        {errors?.root?.serverError.message}
                    </ResponseStatus>
                )}
            </form>
        </>
    );
};
