import { FC } from 'react';
import { Box, Typography, Button, Paper, Container, Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/redux/store';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const Dashboard: FC = () => {
    const router = useRouter();
    const username = useSelector((state: RootState)=> state.user.username);
    useAuthRedirect()
    
    const handleLogout = () => {
        // Implement logout logic here
        // e.g., clearing user session, redirecting to login page
        router.push('/login');
    };
  
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to TaskPulse
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Hello, {username}!
                </Typography>
                <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Dashboard
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This is your dashboard where you can view and manage your tasks. Use the buttons below to navigate to different sections.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Link href="/tasks" passHref>
                                <Button variant="contained" color="primary" fullWidth>
                                    View Tasks
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Link href="/profile" passHref>
                                <Button variant="contained" color="secondary" fullWidth>
                                    View Profile
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <Button variant="outlined" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Dashboard;
