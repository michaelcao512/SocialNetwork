import { useState, useEffect } from "react";
import commentService from "../../../Services/comment.service";
import EditComment from "./EditComment";

function Comment(props) {
    const { comment, user, fetchComments} = props
    const [content, setContent] = useState(comment.content);
    const [username, setUsername] = useState("");
    const [isSelf, setIsSelf] = useState(false);
    
    useEffect(() => {
        fetchAccount();
    }, []);

    function fetchAccount() {
        commentService.getAccountOfComment(comment.commentId)
            .then(response => {
                setUsername(response.username);
                if (response.username === user.username) {
                    setIsSelf(true);
                }
            });
    }

    function handleDelete() {
        commentService.deleteComment(comment.commentId)
        .then(response => {
            fetchComments();
        });
    }

    function handleUpdate(updates) {
        console.log("updates: ", updates);
        commentService.updateComment(updates)
            .then(response => {
                setContent(updates.content);
            });
    }


    return ( 
        <div>
            <p>{username}: {content}
                {isSelf && 
                    <>
                        <EditComment comment={comment} onCommentUpdate={handleUpdate} >Edit Comment</EditComment>
                        <button onClick={handleDelete}>Delete</button>     
                    </>

                }
            </p>
            

        </div>
     );
}

export default Comment;