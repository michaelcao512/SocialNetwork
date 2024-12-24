import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import userInfoService from '../../Services/userinfo.service';
import { StyledButton } from '../../StyledComponents/StyledComponents';


const EditUserInfo = ({ user, userInfo, onUserInfoUpdate }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [biography, setBiography] = useState('');

    useEffect(() => {
        setFirstName(userInfo.firstName || "");
        setLastName(userInfo.lastName || "");
        setGender(userInfo.gender || "");
        setBiography(userInfo.biography || "");
    }, [userInfo]);

    const handleSave = async () => {
        try {
            const updatedUserInfo = { ...userInfo, firstName, lastName, gender, biography };
            console.log(updatedUserInfo);
            await userInfoService.updateUserInfo(updatedUserInfo);
            onUserInfoUpdate();
            setIsEditOpen(false);
        } catch (error) {
            console.log("error updating user info: ", error);
        }
    };

    return (
        <>
            <StyledButton
                sx={{ marginTop: '10px' }}
                variant="outlined"
                color="primary"
                onClick={() => setIsEditOpen(true)}

            >
                Edit Profile
            </StyledButton>
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Gender"
                        type="text"
                        fullWidth
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Biography"
                        type="text"
                        fullWidth
                        multiline
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>

            
            </Dialog>
        </>
    );
};

export default EditUserInfo;