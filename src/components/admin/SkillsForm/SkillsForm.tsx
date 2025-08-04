'use client';

import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import Box from '@/components/common/Box/Box';
import { Button } from '@/components/common/Button/Button';
import Title from '@/components/common/Title/Title';
import { Input } from '@/components/form/Input/Input';

import styles from './SkillsForm.module.scss';

const SkillsForm = () => {
    const t = useTranslations('SkillsFormT');
    const formT = useTranslations('FormT');

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm({
        mode: 'onSubmit',
    });

    // async
    const onSubmit = (formData: { primary: string; secondary: string }) => {
        const { primary, secondary } = formData;

        console.log({
            primary: primary,
            secondary: secondary,
        });
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            console.log('isSubmitSuccessful');
        }
    }, [isSubmitSuccessful]);

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
                    errorMessage={errors?.primary?.message as string}
                    setValue={setValue}
                    {...register('primary', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={t('secondary')}
                    type="text"
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
