import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Theme from '../Theme';

import { useLogout } from '../hooks/useLogout';

import { Link } from "react-router-dom";

export default function Navigation() {
    const { logout, isPending, error} = useLogout();

    const handleLogout = () => {
        logout();
    }

    const routes = [
        { text: 'My Dashboard', link: '/dashboard' },
        { text: 'Calendar', link: '/calendar' },
        { text: 'Create Event', link: '/create-event' },
        { text: 'Friends', link: '/friends' },
        { text: 'Groups', link: '/groups' }
    ];

    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Gator Gather
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
                sx={{
                position: 'relative',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 175,
                    boxSizing: 'border-box',
                    boxShadow: 1,
                    backgroundColor: Theme.palette.secondary.main,
                },
                }}
                anchor="left"
                open={true}
            >
                <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
                >
                    {/* This Toolbar creates space before the List */}
                </Toolbar>
                <Divider />
                <List>
                    {routes.map((route, index) => (
                        <ListItem key={index} component={Link} to={route.link}>
                            <ListItemText primary={route.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                {!isPending && <Button onClick={handleLogout} variant="contained">
                    Log Out
                    </Button>
                }
                {isPending && <Button disabled variant="contained">
                    Logging Out...
                    </Button>
                }
                {error && <div>{error}</div>}
            </Drawer>
        </Box>
    );
}
