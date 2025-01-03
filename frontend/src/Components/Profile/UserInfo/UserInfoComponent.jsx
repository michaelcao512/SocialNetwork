import React from "react";
import { Typography, Avatar } from "@mui/material";
import Friendship from "../Friendship/Friendship";
import { StandardContainer } from "../../../StyledComponents/StyledComponents";

const UserInfoComponent = (props) => {
  const { user, userInfo, profileId, username } = props;

  return (
    <StandardContainer
      sx={{
        textAlign: "center",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      {/* profile picture will replace the letter if there exists a url */}
      <Avatar src={userInfo.avatarUrl || null}>
        {userInfo.firstName?.charAt(0) || "#"}
      </Avatar>
      <Typography variant="h5">
        {userInfo.firstName} {userInfo.lastName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        @{username}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {userInfo.biography}
      </Typography>

      <Friendship user={user} profileId={profileId} />
    </StandardContainer>
  );
};

export default UserInfoComponent;
