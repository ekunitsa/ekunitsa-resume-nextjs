'use client';

import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/common/Button/Button';
import Title from '@/components/common/Title/Title';
import { Input } from '@/components/form/Input/Input';

import styles from './Login.module.scss';

const Login = () => {
    const t = useTranslations('LoginT');
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

    const onSubmit = async (formData: { email: string; password: string }) => {
        const { email, password } = formData;

        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        });

        if (!result?.ok) {
            setError('root.serverError', {
                message: formT('errorAuthFailed'),
            });
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            // Since we are checking whether to display the login form in the server component - we need to refresh the page to display the admin panel after login.
            // The redirect itself will happen in the middleware, but, we need the server side to know that the user is logged in too
            window.location.href = '/admin'; // hard redirect to the admin dashboard. It's similar to "redirect: true" in the signIn()
        }
    }, [isSubmitSuccessful]);

    return (
        <div className={styles.wrapper}>
            <Title noMarginBottom>{t('title')}</Title>

            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                noValidate
            >
                <Input
                    label={t('email')}
                    type={'email'}
                    errorMessage={errors?.email?.message as string}
                    setValue={setValue}
                    {...register('email', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Input
                    label={t('password')}
                    type={'password'}
                    errorMessage={errors?.password?.message as string}
                    setValue={setValue}
                    {...register('password', {
                        required: formT('errorRequiredField'),
                    })}
                />

                <Button
                    buttonType="submit"
                    className={styles.button}
                    disabled={isSubmitting}
                >
                    {t('btn')}
                </Button>

                {errors?.root?.serverError.message && (
                    <p className={styles.errorMessage}>
                        {errors?.root?.serverError.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
