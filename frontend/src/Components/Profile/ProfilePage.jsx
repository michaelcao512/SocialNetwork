import { useEffect, useState } from "react";

import userInfoService from "../../Services/userinfo.service";
import authService from "../../Services/auth.service";
import postService from "../../Services/post.service";

import UserInfoComponent from "./UserInfoComponent";
import CreatePost from "../Posts/Post/CreatePost";
import DisplayPosts from "../Posts/Post/DisplayPosts";

function ProfilePage() {
    const user = authService.getCurrentUser();
    const [userInfo, setUserInfo] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserInfo();
            await fetchPosts();
        };
        fetchData();
    }, []);

    async function fetchUserInfo() {
        try {
            const response = await userInfoService.getUserInfoById(user.id);
            setUserInfo(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    async function fetchPosts() {
        try {
            const response = await postService.getOwnPosts();
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
            {userInfo && <UserInfoComponent user={user} userInfo={userInfo} />
            }
            <CreatePost accountId={user.id} onPostCreated={refreshPostsHandler}/>
            <DisplayPosts accountId={user.id} posts={posts} onPostDelete={refreshPostsHandler} onPostUpdate={refreshPostsHandler}/>
        </>
     );
}

export default ProfilePage;