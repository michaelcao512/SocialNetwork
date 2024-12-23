import { useEffect, useState } from "react";
import commentService from "../../../Services/comment.service";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

function DisplayComments(props) {
    const { post, user } = props;
    const postId = post.postId;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    function fetchComments() {
        commentService.getCommentsByPostId(postId)
        .then(response => {
            setComments(response);
        });
    }


    return ( 
        <>
            <CreateComment post={post} user={user} fetchComments={fetchComments}/>
            {comments.map(comment => (
                <Comment key={comment.commentId} user={user} comment={comment} fetchComments={fetchComments}/>
            ))}
        </>
     );
}

export default DisplayComments;