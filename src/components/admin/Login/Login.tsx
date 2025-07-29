'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// TODO: Translates, react-hook-form for form, styles

const Login = () => {
    const router = useRouter();

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
            // This is the price that we will display the login form if the user exits from any page of the admin panel.
            router.refresh();
        } else {
            alert('Something wrong :(');
        }
    };

    return (
        <div>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                />

                <button type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Login;
