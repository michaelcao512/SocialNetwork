import { useEffect, useState } from "react";
import postService from "../../Services/post.service";
import DisplayPosts from "../Posts/Post/DisplayPosts";

function AllPostsPage() {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await postService.getAllPostsBesidesOwn();
            console.log("response: ", response);
            setPosts(response);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    
    return ( 

        <DisplayPosts posts={posts} user={user} />
     );
}

export default AllPostsPage;