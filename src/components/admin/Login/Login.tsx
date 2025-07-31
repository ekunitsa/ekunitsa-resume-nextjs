'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/common/Button/Button';
import Title from '@/components/common/Title/Title';

import styles from './Login.module.scss';

// TODO: react-hook-form for form, styles

const Login = () => {
    const router = useRouter();
    const t = useTranslations('LoginT');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const res = await signIn('credentials', {
            email: data.get('email'),
            password: data.get('password'),
            redirect: false,
        });

        if (res?.ok) {
            // Since we are checking whether to display the login form in the server component - we need to refresh the page to display the admin panel after login.
            // The redirect itself will happen in the middleware, but, we need the server side to know that the user is logged in too
            router.refresh();
        } else {
            alert('Something wrong :(');
        }
    };

    return (
        <div className={styles.wrapper}>
            <Title noMarginBottom>{t('title')}</Title>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="email">{t('email')}</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">{t('password')}</label>
                    <input
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        required
                    />
                </div>

                <Button buttonType="submit" className={styles.button}>
                    {t('btn')}
                </Button>
            </form>
        </div>
    );
};

export default Login;
