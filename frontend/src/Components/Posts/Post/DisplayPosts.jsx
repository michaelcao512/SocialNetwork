import Post from "./Post";
function DisplayPosts(props) {
    const { posts, onPostDelete, onPostUpdate } = props;
    if (!posts) {
        return <p>No posts to display</p>;
    }
    return (  
        <>
            {posts.map(post => (
                <Post key={post.postId} post={post} onPostDelete={onPostDelete} onPostUpdate={onPostUpdate}/>
            ))}
        </>
    );
}

export default DisplayPosts;