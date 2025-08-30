'use client';

import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/common/Button/Button';
import { Title } from '@/components/common/Title/Title';
import { Checkbox } from '@/components/form/Checkbox/Checkbox';
import { Input } from '@/components/form/Input/Input';
import { Textarea } from '@/components/form/Textarea/Textarea';

import { datePattern, positiveNumberPattern } from '@/utils/patterns';

import { ExperienceDataI } from '@/types/types';

import styles from './ExperienceForm.module.scss';

import {
    deleteExperienceItem,
    postPatchExperience,
} from '@/app/api/actions/experience';

interface ExperienceFormProps {
    data?: ExperienceDataI | null;
}

export const ExperienceForm = ({ data }: ExperienceFormProps) => {
    const t = useTranslations('ExperienceFormT');
    const formT = useTranslations('FormT');
    const locale = useLocale();
    const router = useRouter();

    useEffect(() => {
        if (data && data.language !== locale) {
            router.replace('/admin/experience');
            router.refresh();
        }
    }, []);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onSubmit',
    });

    const onSubmit = async (formData: ExperienceDataI) => {
        const {
            companyName,
            role,
            workTime,
            workDateStart,
            workDateEnd,
            workNow,
            description,
            technologies,
            position,
        } = formData;

        const response = await postPatchExperience({
            id: data && data.id ? data.id : 0,
            language: locale,
            companyName,
            role,
            workTime,
            workDateStart,
            workDateEnd,
            workNow,
            description,
            technologies,
            position: Number(position),
        });

        if (response.ok) {
            router.replace('/admin/experience');
            router.refresh();
        } else {
            setError('root.serverError', {
                message: formT('errorServerActionFailed'),
            });
        }
    };

    const onDelete = async () => {
        if (data && window.confirm(formT('deleteMsg'))) {
            const response = await deleteExperienceItem(data.id);

            if (response.ok) {
                router.replace('/admin/experience');
                router.refresh();
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
                    label={`${t('companyName')}*`}
                    type="text"
                    defaultValue={
                        data && data.companyName ? data.companyName : ''
                    }
                    errorMessage={errors?.companyName?.message as string}
                    setValue={setValue}
                    {...register('companyName', {
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
                    label={`${t('workTime')}*`}
                    type="text"
                    defaultValue={data && data.workTime ? data.workTime : ''}
                    errorMessage={errors?.workTime?.message as string}
                    setValue={setValue}
                    {...register('workTime', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('workDateStart')}*`}
                    type="text"
                    defaultValue={
                        data && data.workDateStart ? data.workDateStart : ''
                    }
                    errorMessage={errors?.workDateStart?.message as string}
                    setValue={setValue}
                    {...register('workDateStart', {
                        required: formT('errorRequiredField'),
                        pattern: {
                            value: datePattern,
                            message: formT('errorDatePattern'),
                        },
                    })}
                />

                <Input
                    label={t('workDateEnd')}
                    type="text"
                    defaultValue={
                        data && data.workDateEnd ? data.workDateEnd : ''
                    }
                    errorMessage={errors?.workDateEnd?.message as string}
                    setValue={setValue}
                    {...register('workDateEnd', {
                        pattern: {
                            value: datePattern,
                            message: formT('errorDatePattern'),
                        },
                    })}
                />

                <Checkbox
                    label={t('workNow')}
                    defaultChecked={data?.workNow}
                    {...register('workNow')}
                />

                <Textarea
                    label={`${t('description')}*`}
                    defaultValue={
                        data && data.description ? data.description : ''
                    }
                    errorMessage={errors?.description?.message as string}
                    setValue={setValue}
                    {...register('description', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Textarea
                    label={`${t('technologies')}*`}
                    defaultValue={
                        data && data.technologies ? data.technologies : ''
                    }
                    errorMessage={errors?.technologies?.message as string}
                    setValue={setValue}
                    {...register('technologies', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={`${t('position')}*`}
                    type="text"
                    defaultValue={
                        data && data.position ? data.position.toString() : ''
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
                    <p className={styles.errorMessage}>
                        {errors?.root?.serverError.message}
                    </p>
                )}
            </form>
        </>
    );
};
