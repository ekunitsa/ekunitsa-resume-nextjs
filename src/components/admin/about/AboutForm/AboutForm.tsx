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

import { positiveNumberPattern } from '@/utils/patterns';

import { AboutDataI } from '@/types/types';

import styles from './AboutForm.module.scss';

import { deleteAboutItem, postPatchAbout } from '@/app/api/actions/about';

interface AboutFormProps {
    data?: AboutDataI | null;
}

export const AboutForm = ({ data }: AboutFormProps) => {
    const t = useTranslations('AboutFormT');
    const formT = useTranslations('FormT');
    const locale = useLocale();
    const router = useRouter();

    useEffect(() => {
        if (data && data.language !== locale) {
            router.replace('/admin/about');
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

    const onSubmit = async (formData: AboutDataI) => {
        const { description, position, bold } = formData;

        const response = await postPatchAbout({
            id: data && data.id ? data.id : 0,
            language: locale,
            description,
            bold,
            position: Number(position),
        });

        if (response.ok) {
            router.replace('/admin/about');
            router.refresh();
        } else {
            setError('root.serverError', {
                message: formT('errorServerActionFailed'),
            });
        }
    };

    const onDelete = async () => {
        if (data && window.confirm(formT('deleteMsg'))) {
            const response = await deleteAboutItem(data.id);

            if (response.ok) {
                router.replace('/admin/about');
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

                <Checkbox
                    label={t('bold')}
                    defaultChecked={data?.bold}
                    {...register('bold')}
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
