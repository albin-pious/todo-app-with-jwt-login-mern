import { FC, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Button, IconButton } from '@mui/material';
import { Assignment, Notes, Home, ExitToApp } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/redux/store';
import UserAvatar from './profile/UserAvatar';

const Sidebar: FC = () => {
    const [showLogout, setShowLogout] = useState(false);
    const router = useRouter();
    const currentPath = router.pathname;
    const username = useSelector((state: RootState) => state.user.username);
    console.log(username);
    

    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clear user session and redirect to login page
        router.push('/login');
    };

    // Utility function to determine if the path is active
    const isActive = (path: string) => currentPath === path;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Ensures the logout button is at the bottom
                },
            }}
        >
            <Box>
                {/* Avatar Section */}
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton onClick={() => setShowLogout(!showLogout)} sx={{ mb: 2 }}>
                        <UserAvatar username={username} />
                    </IconButton>
                </Box>

                {/* Logout Button (conditionally rendered) */}
                {showLogout && (
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button 
                            variant="contained" 
                            color="error" 
                            fullWidth 
                            startIcon={<ExitToApp />} 
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                )}

                {/* Navigation Links */}
                <List>
                    {/* Home Link */}
                    <ListItemButton 
                        component={Link} 
                        href="/dashboard" 
                        selected={isActive('/dashboard')}
                    >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>

                    {/* Todo Link */}
                    <ListItemButton 
                        component={Link} 
                        href="/todo" 
                        selected={isActive('/todo')}
                    >
                        <ListItemIcon>
                            <Assignment />
                        </ListItemIcon>
                        <ListItemText primary="Todo" />
                    </ListItemButton>

                    {/* My Notes Link */}
                    <ListItemButton 
                        component={Link} 
                        href="/mynotes" 
                        selected={isActive('/mynotes')}
                    >
                        <ListItemIcon>
                            <Notes />
                        </ListItemIcon>
                        <ListItemText primary="My Notes" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
