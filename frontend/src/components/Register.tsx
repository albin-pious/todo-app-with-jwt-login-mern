import { useState, FC, FormEvent } from 'react';
import { Button, TextField, Typography, Paper, Box, IconButton } from '@mui/material';
import { createUser } from '../services/api/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Using Next.js router for navigation

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createUser(username, password);
            // Redirect to login page upon successful registration
            router.push('/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <Paper elevation={3} className="p-6 mx-auto max-w-sm">
            <Box className="mb-4 flex items-center">
                <IconButton onClick={() => router.back()} aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <Typography component="h1" variant="h5" className="flex-1 text-center font-bold">
                    Register
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box className="space-y-4">
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                    >
                        Register
                    </Button>
                    {error && <Typography color="error" className="text-center mt-2">{error}</Typography>}
                </Box>
            </form>
            <Box className="mt-4 text-center">
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Link href='/login' passHref>
                        <Button variant="text" color="primary" onClick={() => router.push('/login')}>
                            Login
                        </Button>
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Register;
