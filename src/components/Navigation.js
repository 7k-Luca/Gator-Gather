import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import Theme from '../Theme';

import { Link } from "react-router-dom";

export default function Navbar() {
    const routes = [
        { text: 'My Dashboard', link: '/dashboard' },
        { text: 'Calendar', link: '/calendar' },
        { text: 'Create Event', link: '/create-event' },
        { text: 'Friends', link: '/friends' },
        { text: 'Groups', link: '/groups' },
        { text: 'Log Out', link: '/login' },
    ];

    return (
        <Box >
            <CssBaseline />
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
                position: 'fixed',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 175,
                    boxSizing: 'border-box',
                    boxShadow: 1,
                    backgroundColor: Theme.palette.secondary.main,
                },
                }}
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
                        <ListItem key={index} button component={Link} to={route.link}>
                            <ListItemText primary={route.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
