import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

function Post(props) {
    const { post, onPostDelete, onPostUpdate } = props;

    return ( 
        <div>
            <span>{post.content}</span>
            <EditPost post={post} onPostUpdate={onPostUpdate} />
            <DeletePost id={post.postId} onPostDelete={onPostDelete} />
        </div>
     );
    
}

export default Post;