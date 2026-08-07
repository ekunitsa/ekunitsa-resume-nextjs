'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { postPatchSummary } from '@/app/api/actions/summary';
import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Textarea } from '@/components/form/Textarea/Textarea';
import type { SummaryI } from '@/types/types';
import { ResponseStatus } from '../ResponseStatus/ResponseStatus';
import styles from './SummaryForm.module.scss';

interface SummaryFormProps {
    data: SummaryI | null;
}

export const SummaryForm = ({ data }: SummaryFormProps) => {
    const t = useTranslations('SummaryFormT');
    const formT = useTranslations('FormT');
    const locale = useLocale();
    const router = useRouter();
    const [successResponse, setSuccessResponse] = useState(false);

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

    const onSubmit = async (formData: { content: string }) => {
        clearErrors('root.serverError');

        const response = await postPatchSummary({
            language: locale,
            content: formData.content,
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

            <div>{t('description')}</div>

            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                noValidate
            >
                <Textarea
                    label={`${t('content')}*`}
                    defaultValue={data?.content || ''}
                    errorMessage={errors?.content?.message as string}
                    rows={16}
                    setValue={setValue}
                    {...register('content', {
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
