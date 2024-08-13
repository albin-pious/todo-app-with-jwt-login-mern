import { userLogin } from '@/services/api/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Paper, IconButton, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import { FC, FormEvent, useState } from "react";
import { useRouter } from 'next/router';
import { login as loginUser } from '@/services/redux/userSlice';
import { useDispatch } from 'react-redux';

const Login: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await userLogin(username, password);
            console.log('response',response);
            dispatch(loginUser(response.userName))
            router.push('/dashboard'); // Redirect to the dashboard or any other page upon successful login
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
                <Link href="/" passHref>
                    <IconButton>
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Typography component="h1" variant="h5" className="flex-1 text-center font-bold">
                    Login
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
                        Login
                    </Button>
                    {error && <Typography color="error" className="text-center mt-2">{error}</Typography>}
                </Box>
            </form>
            <Box className="mt-4 text-center">
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link href='/register' passHref>
                        <Button variant="text" color="primary" onClick={() => router.push('/register')}>
                            Create
                        </Button>
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Login;
