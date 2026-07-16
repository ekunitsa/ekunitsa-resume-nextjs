'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { deleteLanguage, postPatchLanguage } from '@/app/api/actions/languages';
import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Input } from '@/components/form/Input/Input';

import type { LanguageDataI } from '@/types/types';
import { positiveNumberPattern } from '@/utils/patterns';
import { ResponseStatus } from '../ResponseStatus/ResponseStatus';
import styles from './LanguagesForm.module.scss';

interface LanguagesFormProps {
    data?: LanguageDataI | null;
}

export const LanguagesForm = ({ data }: LanguagesFormProps) => {
    const t = useTranslations('LanguagesFormT');
    const formT = useTranslations('FormT');
    const locale = useLocale();
    const router = useRouter();

    useEffect(() => {
        if (data && data.language !== locale) {
            router.replace('/admin/languages');
        }
    }, []);

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

    const onSubmit = async (formData: LanguageDataI) => {
        clearErrors('root.serverError');

        const { label, level, position } = formData;

        const response = await postPatchLanguage({
            id: data?.id ? data.id : 0,
            language: locale,
            label,
            level,
            position: Number(position),
        });

        if (response.ok) {
            router.replace('/admin/languages');
        } else {
            setError('root.serverError', {
                message: formT('errorServerActionFailed'),
            });
        }
    };

    const onDelete = async () => {
        clearErrors('root.serverError');

        if (data && window.confirm(formT('deleteMsg'))) {
            const response = await deleteLanguage(data.id);

            if (response.ok) {
                router.replace('/admin/languages');
            } else {
                setError('root.serverError', {
                    message: formT('errorServerDeleteActionFailed'),
                });
            }
        }
    };

    return (
        <>
            <div className={styles.header}>
                <Title noMarginBottom>{t('title')}</Title>

                {data && (
                    <div className={styles.btnWrapper}>
                        <Button buttonType="button" onClick={onDelete} square>
                            <AiOutlineDelete />
                        </Button>
                    </div>
                )}
            </div>

            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                noValidate
            >
                <Input
                    label={`${t('label')}*`}
                    type="text"
                    defaultValue={data?.label ? data.label : ''}
                    errorMessage={errors?.label?.message as string}
                    setValue={setValue}
                    {...register('label', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('level')}*`}
                    type="text"
                    defaultValue={data?.level ? data.level : ''}
                    errorMessage={errors?.level?.message as string}
                    setValue={setValue}
                    {...register('level', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('position')}*`}
                    type="text"
                    defaultValue={
                        data?.position ? data.position.toString() : ''
                    }
                    errorMessage={errors?.position?.message as string}
                    setValue={setValue}
                    {...register('position', {
                        required: formT('errorRequiredField'),
                        pattern: {
                            value: positiveNumberPattern,
                            message: formT('errorPositiveNumberPattern'),
                        },
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
                    <ResponseStatus status={'error'}>
                        {errors?.root?.serverError.message}
                    </ResponseStatus>
                )}
            </form>
        </>
    );
};
