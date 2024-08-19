import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Assignment, Notes } from '@mui/icons-material';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Typography variant="h6" sx={{ padding: 2 }}>
                My App
            </Typography>
            <List>
                <Link href="/todo" passHref>
                    <ListItem button>
                        <ListItemIcon>
                            <Assignment />
                        </ListItemIcon>
                        <ListItemText primary="Todo" />
                    </ListItem>
                </Link>
                <Link href="/mynotes" passHref>
                    <ListItem button>
                        <ListItemIcon>
                            <Notes />
                        </ListItemIcon>
                        <ListItemText primary="My Notes" />
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
};

export default Sidebar;
