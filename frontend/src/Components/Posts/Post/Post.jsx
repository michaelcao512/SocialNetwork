import DisplayReactions from "../Reactions/DisplayReactions";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import DisplayComments from "../Comments/DisplayComments";
import { useEffect, useState } from "react";

import userService from "../../../Services/user.service";
function Post(props) {
    const { post, user, onPostDelete, onPostUpdate } = props;
    const [ postOwner, setPostOwner ] = useState("");
    const [ canManagePost, setCanManagePost] = useState(false);

    useEffect(() => {
        try {
            userService.getAccountOfPost(post.postId)
                .then(response => {
                setPostOwner(response);
                if (response.username === user.username) {
                    setCanManagePost(true);
                }
            });
        } catch (error) {
            console.log("error: ", error);
        }
    }, []);


    return ( 
        <div>
            <h2>{postOwner.username}: {post.content}</h2>
            <DisplayReactions post={post} user={user} />
            {canManagePost &&
                <>
                    <EditPost post={post} onPostUpdate={onPostUpdate} />
                    <DeletePost id={post.postId} onPostDelete={onPostDelete} />
                </>
            }
            <DisplayComments post={post} user={user} />
        </div>
     );
    
}

export default Post;