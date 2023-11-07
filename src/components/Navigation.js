import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Material Components
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
import Modal from '@mui/material/Modal';
import Theme from '../Theme';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Notifications from '@mui/icons-material/Notifications'

// useLogout & useDeleteAccount hooks
import { useLogout } from '../hooks/useLogout';
import { useDeleteAccount } from '../hooks/useDeleteAccount';

// useAuthContxt
import { projectFirestore, projectAuth } from '../firebase/config';

import { Link } from "react-router-dom";
import { TextField } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
}

export default function Navigation() {
    const [fullName, setFullName] = useState('Loading...');
    const [password, setPassword] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [profileModal, setProfileModal] = useState(null);
    const open = Boolean(profileModal);
    const buttonRef = useRef(null);
    const { logout, isPending, error } = useLogout();
    const { deleteAccount, isDeletePending, deleteError } = useDeleteAccount();
    const { uid } = projectAuth.currentUser;
    const navigate = useNavigate();

    const handleProfileOpen = (event) => {
        setProfileModal(event.currentTarget);
    }
    const handleProfileClose = () => {
        setProfileModal(null);
        navigate(`/profile/${uid}`);
    }

    // I need to create a useFirstore Hook
    useEffect(() => {
        const { uid } = projectAuth.currentUser;
        const userDocRef = projectFirestore.collection('users').doc(uid);
        async function getFullName() {
            try {
                const doc = await userDocRef.get();
                if (doc.exists) {
                    const fullName = doc.data().fullName;
                    // Now you can use the fullName in your application
                    setFullName(fullName);
                } else {
                    // doc.data() will be undefined in this case
                    setFullName("Guest");
                }
            } catch (error) {
                // Handle any errors here
                console.error("Error getting display name:", error);
                return "Error";
            }
        }
        getFullName();
    }, [])
    

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    const handleDeleteAccount = async () => {
        await deleteAccount(password);
        closeDeleteModal();
    }  

    const openDeleteModal = () => {
        setDeleteModal(true);
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
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
            <AppBar position="fixed"  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Box   sx={{ display: 'flex', flexGrow: 1,}} alignItems="center" justifyContent="space-between" width="100%">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Gator Gather
                    </Typography>
                </Toolbar>
                
                <Toolbar>
                    <Button variant="contained" sx={{marginRight: 2}}>
                        <Notifications /> 
                        {/* TODO: If user had a notification the notification button identifies that and then you will be able to see that notification and click on it to view it. if there are no notifcations and select the notifications button it will read no notifications available. */}
                    </Button>
                    <Button variant="contained" onClick={handleProfileOpen} id="basic-button" ref={buttonRef} aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                        <Typography variant="subtitle1" noWrap component="div" align='center'>
                        {fullName}
                        </Typography>
                    </Button>
                    <Menu
                        anchorEl={profileModal}
                        open={open}
                        onClose={() => setProfileModal(null)}
                        id="basic-menu"
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
                </Box>
                
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
                
                
                <Box alignSelf="center">
                    <Button onClick={openDeleteModal} variant="contained">
                        Delete Account
                    </Button>
                </Box>
                <Box>
                    <Modal 
                        open={deleteModal}
                        onClose={closeDeleteModal}
                        aria-labelledby="Delete Account Modal"
                        aria-describedby="This modal will give you the option to delete your account."
                        >
                        <Box sx={modalStyle} >
                            <Typography id="modal-modal-title" align="center" variant="h4" component="h2">
                                Delete Account
                            </Typography>
                            <Typography id="modal-modal-describiton" align="center" variant="h6" component="h2"> 
                                Are you sure you would like to delete your account?
                            </Typography>
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                            />

                            <Box flexDirection="row" alignSelf="center" alignItems='center' justifyContent="center" justifySelf="center"> 
                                <Button onClick={closeDeleteModal}>
                                    Close
                                </Button>
                                <Button onClick={handleDeleteAccount}>
                                    Delete Account
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                {isPending && isDeletePending && <>
                    <Button disabled variant="contained">
                        Logging Out...
                    </Button>
                    </>
                }
                {error && <div>{error}</div>}
                {deleteError && <div>{deleteError}</div>}
            </Drawer>
        </Box>
    );
}
