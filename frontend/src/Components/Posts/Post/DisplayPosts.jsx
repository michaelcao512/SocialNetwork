import Post from "./Post";
function DisplayPosts(props) {
    const { posts, accountId, onPostDelete, onPostUpdate } = props;
    if (!posts) {
        return <p>No posts to display</p>;
    }
    return (  
        <>
            {posts.map(post => (
                <Post key={post.postId} post={post} accountId={accountId} onPostDelete={onPostDelete} onPostUpdate={onPostUpdate}/>
            ))}
        </>
    );
}

export default DisplayPosts;