import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import userInfoService from "../../../Services/userinfo.service";
import { StyledButton } from "../../../StyledComponents/StyledComponents";
import "./userinfo.css";
import { Close } from "@mui/icons-material";

const EditUserInfo = ({ user, userInfo, onUserInfoUpdate }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [biography, setBiography] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("placeholder");

  useEffect(() => {
    setFirstName(userInfo.firstName || "");
    setLastName(userInfo.lastName || "");
    setGender(userInfo.gender || "");
    setBiography(userInfo.biography || "");
    setAvatarUrl(userInfo.avatarUrl || "placeholder");
  }, [userInfo]);

  const handleSave = async () => {
    try {
      const updatedUserInfo = {
        ...userInfo,
        firstName,
        lastName,
        gender,
        biography,
        avatarUrl,
      };
      await userInfoService.updateUserInfo(updatedUserInfo);
      onUserInfoUpdate();
      setIsEditOpen(false);
    } catch (error) {
      console.log("error updating user info: ", error);
    }
  };

  const handleCancel = () => {
    setFirstName(userInfo.firstName || "");
    setLastName(userInfo.lastName || "");
    setGender(userInfo.gender || "");
    setBiography(userInfo.biography || "");
    setAvatarUrl(userInfo.avatarUrl || "placeholder");
    setIsEditOpen(false);
  };

  const handleDeleteAvatar = () => {
    setAvatarUrl("placeholder");
  };

  useEffect(() => {
    console.log("Avatar Url: ", avatarUrl);
  }, [avatarUrl]);

  return (
    <>
      <StyledButton
        sx={{ marginTop: "10px" }}
        variant="outlined"
        color="primary"
        onClick={() => setIsEditOpen(true)}
      >
        Edit Profile
      </StyledButton>
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <input
            type="file"
            id="avatar-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                if (!file.type.startsWith("image/")) {
                  alert("Please select a valid image.");
                } else {
                  const reader = new FileReader();
                  reader.onload = (e) => setAvatarUrl(e.target.result);
                  reader.readAsDataURL(file);
                }
              }
            }}
          />
          <div
            style={{
              position: "relative",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <Avatar
              style={{ margin: "auto" }}
              src={avatarUrl}
              onClick={() => document.getElementById("avatar-input").click()}
              id="edit-profile-avatar"
            >
              {userInfo.firstName?.charAt(0) || "#"}
            </Avatar>

            {avatarUrl && avatarUrl !== "placeholder" && (
              <Close
                onClick={handleDeleteAvatar}
                sx={{
                  position: "absolute",
                  top: "0rem",
                  left: "1.7rem",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  display: "hidden",
                }}
                className="delete-avatar-icon"
              />
            )}
          </div>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
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
          <Button onClick={handleCancel} color="secondary">
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
