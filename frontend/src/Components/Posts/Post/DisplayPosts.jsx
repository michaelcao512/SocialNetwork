import { useEffect } from "react";
import Post from "./Post";
function DisplayPosts(props) {
    const { posts, user, onPostDelete, onPostUpdate } = props;
    if (!posts) {
        return <p>No posts to display</p>;
    }
    return (  
        <>
            {posts.map(post => (
                <Post key={post.postId} post={post} user={user} onPostDelete={onPostDelete} onPostUpdate={onPostUpdate}/>
            ))}
        </>
    );
}

export default DisplayPosts;