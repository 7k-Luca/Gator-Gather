import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { projectAuth } from '../firebase/config'; 
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';

export default function Friends() {
    const [isPending, setIsPending] = useState(false);
    const { documents, error } = useCollection('users');
    const { updateDocument } = useFirestore('users');
    const { uid } = projectAuth.currentUser;

    const validateUser = (user) => {
        if (user.id !== uid) {
            return true;
        } else {
            return false;
        }
    }

    const handleAddFriend = async (id) => {
        setIsPending(true);
        try {
            // Fetch the user's current friends array
            const userDoc = await updateDocument(id);
        
            if (userDoc && userDoc.data()) {
                const userData = userDoc.data();
                const friendsArray = userData.friends || [];

            // Check if the friend is already in the array
            if (!friendsArray.includes(id)) {
                // Add the user's ID to teh friends array
                friendsArray.push(id);
                // Update the user's document wish the modified friends array
                await updateDocument(id, { friends: friendsArray })
                console.log('updated!')
                setIsPending(false);
            } else {
                setIsPending(false);
                console.log("User is already your friend.")
                console.log(id)
            }}
        } catch (err) {
            console.log(err)
            setIsPending(false);
        } 
    }

    return (
        <Box>
            
            <Typography variant="h4" noWrap component="div" align='center'>
                Discover Friends
            </Typography>
            
                {error && <div>{error}</div>}
                    {documents && documents.map(user => (
                        validateUser(user) && (
                        <Box 
                        sx={{
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '200px',
                            height: '100px',
                        }}
                        key={user.id}
                    >
                            <Typography variant="h6" noWrap component="div" align="center">{user.fullName}</Typography>
                            <Box textAlign="center" paddingBottom="">
                                <Button variant="contained" onClick={() => handleAddFriend(user.id)} fullWidth >Add Friend</Button>
                            </Box>
                        </Box>
                    )))}
                
        </Box>
    )
}
