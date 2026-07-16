'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { postPatchSkills } from '@/app/api/actions/skills';
import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Textarea } from '@/components/form/Textarea/Textarea';
import type { SkillsInputI } from '@/types/types';
import { ResponseStatus } from '../ResponseStatus/ResponseStatus';
import styles from './SkillsForm.module.scss';

interface SkillsFormProps {
    data: SkillsInputI | null;
}

export const SkillsForm = ({ data }: SkillsFormProps) => {
    const t = useTranslations('SkillsFormT');
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

    const onSubmit = async (formData: {
        primary: string;
        secondary: string;
        ai: string;
    }) => {
        clearErrors('root.serverError');

        const { primary, secondary, ai } = formData;

        const response = await postPatchSkills({
            language: locale,
            primary: primary.split(','),
            secondary: secondary.split(','),
            ai: ai.split(','),
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
                    label={`${t('primary')}*`}
                    defaultValue={
                        data?.primary && data.primary.length > 0
                            ? data.primary.join(',')
                            : ''
                    }
                    errorMessage={errors?.primary?.message as string}
                    setValue={setValue}
                    {...register('primary', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Textarea
                    label={`${t('secondary')}*`}
                    defaultValue={
                        data?.secondary && data.secondary.length > 0
                            ? data.secondary.join(',')
                            : ''
                    }
                    errorMessage={errors?.secondary?.message as string}
                    setValue={setValue}
                    {...register('secondary', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Textarea
                    label={`${t('ai')}*`}
                    defaultValue={
                        data?.ai && data.ai.length > 0 ? data.ai.join(',') : ''
                    }
                    errorMessage={errors?.ai?.message as string}
                    setValue={setValue}
                    {...register('ai', {
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
