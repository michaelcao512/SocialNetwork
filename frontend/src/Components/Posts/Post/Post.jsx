import DisplayReactions from "../Reactions/DisplayReactions";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import DisplayComments from "../Comments/DisplayComments";
function Post(props) {
    const { post, user, onPostDelete, onPostUpdate } = props;

    return ( 
        <div>
            <h2>{user.username}: {post.content}</h2>
            <DisplayReactions post={post} user={user}/>
            <EditPost post={post} onPostUpdate={onPostUpdate} />
            <DeletePost id={post.postId} onPostDelete={onPostDelete} />
            <DisplayComments post={post} user={user} />
        </div>
     );
    
}

export default Post;