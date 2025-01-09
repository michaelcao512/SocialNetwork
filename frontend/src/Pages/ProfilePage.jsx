import React, { useEffect, useState, useCallback } from "react";

import { StyledStack, StyledCard } from "../StyledComponents/StyledComponents";
import { Typography, Divider } from "@mui/material";

import userInfoService from "../Services/userinfo.service";
import authService from "../Services/auth.service";
import postService from "../Services/post.service";
import userService from "../Services/user.service";

import UserInfoComponent from "../Components/Profile/UserInfo/UserInfoComponent";
import CreatePost from "../Components/Posts/Post/CreatePost";
import DisplayPosts from "../Components/Posts/Post/DisplayPosts";
import { useParams } from "react-router-dom";
import EditUserInfo from "../Components/Profile/UserInfo/EditUserInfo";

function ProfilePage() {
  const { profileUserId } = useParams();
  let profileId = parseInt(profileUserId);
  const user = authService.getCurrentUser();

  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [username, setUsername] = useState();

  const fetchUsername = useCallback(async () => {
    try {
      const response = await userService.getUsernameByAccountId(profileId);
      setUsername(response);
      console.log(username);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [profileId, username]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await userInfoService.getUserInfoByAccountId(profileId);
      setUserInfo(response);
      console.log("response", response);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [profileId]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await postService.getPostsByAccountId(profileId);
      setPosts(response);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [profileId]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
      await fetchPosts();
      await fetchUsername();
    };
    fetchData();

    if (profileId === user.id) {
      setIsOwnProfile(true);
    }
  }, [profileId, user.id, fetchUserInfo, fetchPosts, fetchUsername]);

  async function refreshPostsHandler() {
    await fetchPosts();
  }
  return (
    <StyledStack>
      <Typography variant="h3" gutterBottom>
        Profile
      </Typography>
      <StyledCard>
        <UserInfoComponent
          user={user}
          userInfo={userInfo}
          profileId={profileId}
          username={username}
        />
        {isOwnProfile && (
          <>
            <EditUserInfo
              user={user}
              userInfo={userInfo}
              onUserInfoUpdate={fetchUserInfo}
            />
          </>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" gutterBottom>
          Posts
        </Typography>
        {isOwnProfile && (
          <CreatePost user={user} onPostCreated={refreshPostsHandler} />
        )}
        <DisplayPosts
          user={user}
          posts={posts}
          onPostDelete={refreshPostsHandler}
          onPostUpdate={refreshPostsHandler}
        />
      </StyledCard>
    </StyledStack>
  );
}

export default ProfilePage;
