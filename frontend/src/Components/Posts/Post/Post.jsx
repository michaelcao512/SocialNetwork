import DisplayReactions from "../Reactions/DisplayReactions";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

function Post(props) {
    const { post, accountId, onPostDelete, onPostUpdate } = props;

    return ( 
        <div>
            <p>{post.content}</p>
            <DisplayReactions post={post} accountId={accountId}/>
            <EditPost post={post} onPostUpdate={onPostUpdate} />
            <DeletePost id={post.postId} onPostDelete={onPostDelete} />
        </div>
     );
    
}

export default Post;