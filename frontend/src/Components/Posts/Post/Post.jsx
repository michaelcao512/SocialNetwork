import DisplayReactions from "../Reactions/DisplayReactions";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import DisplayComments from "../Comments/DisplayComments";
import { useEffect, useState } from "react";
function Post(props) {
    const { post, user, onPostDelete, onPostUpdate } = props;
    const [canManagePost, setCanManagePost] = useState(false);
    useEffect(() => {
        if (user && post) {
            setCanManagePost(user.userId === post.userId);
        }
    }, [user, post]);


    return ( 
        <div>
            <h2>{user.username}: {post.content}</h2>
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