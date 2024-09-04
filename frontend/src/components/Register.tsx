import { useState, FC, FormEvent, useEffect } from 'react';
import { Button, TextField, Typography, Paper, Box, IconButton } from '@mui/material';
import { createUser, usernameChecker } from '../services/api/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import debounce from 'lodash.debounce';
import { green } from '@mui/material/colors';

const Register: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValidUserName, setIsValidUserName] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Using Next.js router for navigation

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createUser(username, password);
            // Redirect to login page upon successful registration
            router.push('/login');
        } catch (err: unknown) {
            console.log(err);
            
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === 'object' && err !== null && 'message' in err){
                setError((err as any).message)
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    useEffect(()=>{
        if(username){
            usernameAvailability(username);
        } else {
            setIsValidUserName(null);
        }

        return ()=>{
            usernameAvailability.cancel();
        }
    },[username])

    const usernameAvailability = debounce(async(username:string)=>{
        try {
            const response = await usernameChecker(username);
            setIsValidUserName(response.available);
        } catch (error) {
            setIsValidUserName(null)
        }
    }, 2000);

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
                        error={isValidUserName === false}
                        helperText={
                            isValidUserName === false ? 'Username is already taken' 
                            : isValidUserName === true ? 'Username is available'
                            : ''
                        }
                        InputProps={{
                            style: {
                                borderColor: isValidUserName === true ? green[400] : undefined
                            }
                        }}
                        FormHelperTextProps={{
                            style: {
                                color: isValidUserName === true ? green[500] : undefined,
                            },
                        }}
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
