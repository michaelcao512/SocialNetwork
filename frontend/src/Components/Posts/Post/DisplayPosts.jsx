import Post from "./Post";
import { StandardContainer } from "../../../StyledComponents/StyledComponents";
function DisplayPosts(props) {
    const { posts, user, onPostDelete, onPostUpdate } = props;
    if (posts.length === 0) {
        return <p>No posts to display</p>;
    }
    return (  
        <StandardContainer style={{
            padding: "0 0.2rem",
            border:"none",
            boxShadow: "none"
        }}>

            <>
                {posts.map(post => (
                    <Post key={post.postId} post={post} user={user} onPostDelete={onPostDelete} onPostUpdate={onPostUpdate}/>
                ))}
            </>
        </StandardContainer>

  
    );
}

export default DisplayPosts;