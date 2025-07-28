'use client';

import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
}));

// TODO: Translates, redirect after login, react-hook-form for form

const Login = () => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const res = await signIn('credentials', {
            email: data.get('email'),
            password: data.get('password'),
            redirect: false,
        });

        if (res?.ok) {
            alert('Logged in');
        } else {
            alert('Error');
        }
    };

    return (
        <>
            <CssBaseline enableColorScheme />

            <Card variant="outlined">
                <Typography
                    component="h1"
                    sx={{
                        width: '100%',
                        fontSize: '24px',
                    }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            required
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                        />
                    </FormControl>

                    <Button type="submit" fullWidth variant="contained">
                        Sign in
                    </Button>
                </Box>
            </Card>
        </>
    );
};

export default Login;
