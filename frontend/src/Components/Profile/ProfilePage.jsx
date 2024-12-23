import { useEffect, useState } from "react";

import userInfoService from "../../Services/userinfo.service";
import authService from "../../Services/auth.service";
import postService from "../../Services/post.service";
import userService from "../../Services/user.service";

import UserInfoComponent from "./UserInfoComponent";
import CreatePost from "../Posts/Post/CreatePost";
import DisplayPosts from "../Posts/Post/DisplayPosts";
import { useParams } from "react-router-dom";

function ProfilePage() {
    const { profileUserId } = useParams();
    let profileId = parseInt(profileUserId);
    const user = authService.getCurrentUser();

    const [account, setAccountInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserInfo();
            await fetchPosts();
            await fetchAccountInfo();

        };
        fetchData();
        if (profileUserId == user.id) {
            setIsOwnProfile(true);
        }
    }, []);

    async function fetchAccountInfo() {
        try {
            const response = await userService.getUserById(profileId);
            setAccountInfo(response);
            console.log("account: ", response);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    async function fetchUserInfo() {
        try {
            const response = await userInfoService.getUserInfoByAccountId(profileId);
            setUserInfo(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    async function fetchPosts() {
        try {
            const response = await postService.getPostsByAccountId(profileId);
            setPosts(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async function refreshPostsHandler() {
        await fetchPosts();
    }

    return ( 
        <>
            <h1>Profile Page</h1>
            <UserInfoComponent user={user} userInfo={userInfo} />

            {isOwnProfile && <CreatePost user={user} onPostCreated={refreshPostsHandler} /> }
            <DisplayPosts user={user} posts={posts} isOwnProfile={isOwnProfile} onPostDelete={refreshPostsHandler} onPostUpdate={refreshPostsHandler}/>
        </>
     );
}

export default ProfilePage;