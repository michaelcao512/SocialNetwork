import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import userInfoService from "../../Services/userinfo.service";

function EditUserInfo(props) {
    const { userInfo, onUserInfoUpdate } = props;
    const [isEditOpen, setIsEditOpen] = useState(false);


    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [gender, setGender] = useState(userInfo.gender);



    const handleSave = async () => {
        try {
            const updatedUserInfo = { ...userInfo, firstName, lastName, gender };
            await userInfoService.updateUserInfo(updatedUserInfo);
            onUserInfoUpdate();
            setIsEditOpen(false);
        } catch (error) {
            console.log("error updating post: ", error);
        }
    }

    return ( 

        <>
            <Button variant="outlined" color="secondary" onClick={() => setIsEditOpen(true)}>Edit User Information</Button>
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <DialogTitle>Edit Post</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstname"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                </DialogContent>
                
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </DialogContent>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gender"
                        label="Gender"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    />
                </DialogContent>
                




                <DialogActions>
                    <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
     );
}

export default EditUserInfo;