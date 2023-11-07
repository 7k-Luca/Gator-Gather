import {useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';
import { projectAuth } from '../firebase/config';

export default function Profile({ uid }) {
    const { currentUser } = useAuthContext();
    console.log(uid)
    // const { data, isLoading, error } = useFirestore('users', uid)
    
    return (
        <Box>
            <Typography variant="h6" noWrap component="div">
                {/* {data} */}
                {uid}
                
            </Typography>
        </Box>
    )
}
