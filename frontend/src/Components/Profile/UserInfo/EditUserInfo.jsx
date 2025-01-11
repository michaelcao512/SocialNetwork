import React, { useState, useEffect } from "react";
import imageService from "../../../Services/image.service";
import SelectImage from "../../Image/SelectImage";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Avatar,
  Typography,
} from "@mui/material";
import userInfoService from "../../../Services/userinfo.service";
import { StyledButton } from "../../../StyledComponents/StyledComponents";
import "./userinfo.css";

const EditUserInfo = ({ user, userInfo, onUserInfoUpdate }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [biography, setBiography] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const s3BucketUrl = import.meta.env.VITE_BASE_S3_BUCKET_URL;

  useEffect(() => {
    setFirstName(userInfo.firstName || "");
    setLastName(userInfo.lastName || "");
    setGender(userInfo.gender || "");
    setBiography(userInfo.biography || "");
    setAvatarUrl(userInfo.avatarUrl || null);
  }, [userInfo]);

  const handleImageSelect = (file) => {
    setSelectedImages([file]); // Replace any previous image
  };

  const handleImageRemove = () => {
    setSelectedImages([]); // Clear the selected image
  };

  const handleSave = async () => {
    try {
      if (selectedImages.length > 0) {
        const image = selectedImages[0];
        const formData = new FormData();
        formData.append("file", image);
        formData.append("fileName", image.name);
        formData.append("accountId", user.id);
        formData.append("imageType", "PROFILE");

        // Upload the image; backend handles associating the bucket key
        await imageService.uploadFile(formData);
      }

      // Update user info without changing avatarUrl (backend already updated it)
      const updatedUserInfo = {
        ...userInfo,
        firstName,
        lastName,
        gender,
        biography,
      };

      console.log("Updated User Info:", updatedUserInfo);

      await userInfoService.updateUserInfo(updatedUserInfo);
      onUserInfoUpdate();
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

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
          <Avatar
            style={{ margin: "auto", cursor: "pointer" }}
            src={avatarUrl ? `${s3BucketUrl}${avatarUrl}` : ""}
            onClick={() => document.getElementById("avatar-input").click()}
            id="edit-profile-avatar"
          >
            {userInfo.firstName?.charAt(0) || "#"}
          </Avatar>
          <input
            type="file"
            id="avatar-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleImageSelect(file);
              }
            }}
          />
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
          <TextField
            margin="dense"
            label="Biography"
            type="text"
            fullWidth
            multiline
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          {selectedImages.length > 0 && (
            <div>
              <Typography variant="body2">Selected Image:</Typography>
              <img
                src={URL.createObjectURL(selectedImages[0])}
                alt="Selected"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
              <Button onClick={handleImageRemove} color="secondary">
                Remove
              </Button>
            </div>
          )}
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
