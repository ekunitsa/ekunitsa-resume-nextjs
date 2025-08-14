'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import Box from '@/components/common/Box/Box';
import { Button } from '@/components/common/Button/Button';
import Title from '@/components/common/Title/Title';
import { Input } from '@/components/form/Input/Input';

import { SkillsInputI } from '@/types/types';

import styles from './SkillsForm.module.scss';

import { skillsPostPatch } from '@/app/api/actions/skills';

interface SkillsFormProps {
    data: SkillsInputI | null;
}

const SkillsForm = ({ data }: SkillsFormProps) => {
    const t = useTranslations('SkillsFormT');
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

    // async
    const onSubmit = async (formData: {
        primary: string;
        secondary: string;
    }) => {
        const { primary, secondary } = formData;

        const response = await skillsPostPatch({
            language: locale,
            primary: primary.split(','),
            secondary: secondary.split(','),
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
        <Box corners={['bottomLeft', 'topRight']} className={styles.wrapper}>
            <Title noMarginBottom>{t('title')}</Title>

            <div>{t('description')}</div>

            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                noValidate
            >
                <Input
                    label={t('primary')}
                    type="text"
                    defaultValue={
                        data && data.primary && data.primary.length > 0
                            ? data.primary.join(',')
                            : ''
                    }
                    errorMessage={errors?.primary?.message as string}
                    setValue={setValue}
                    {...register('primary', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={t('secondary')}
                    type="text"
                    defaultValue={
                        data && data.secondary && data.secondary.length > 0
                            ? data.secondary.join(',')
                            : ''
                    }
                    errorMessage={errors?.secondary?.message as string}
                    setValue={setValue}
                    {...register('secondary', {
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
        </Box>
    );
};

export default SkillsForm;
