import { useState, useEffect } from "react";
import accountService from "../../../Services/user.service";
import commentService from "../../../Services/comment.service";
import EditComment from "./EditComment";

function Comment(props) {
    const { comment, user, fetchComments} = props
    const [ content, setContent] = useState(comment.content);
    const [ commentOwner, setCommentOwner] = useState("");
    const [ canManageComment, setCanManageComment] = useState(false);
    
    useEffect(() => {
        fetchAccount();
    }, []);

    function fetchAccount() {
        accountService.getAccountOfComment(comment.commentId)
            .then(response => {
                setCommentOwner(response);
                if (response.username === user.username) {
                    setCanManageComment(true);
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
            <p>{commentOwner.username}: {content}
                {canManageComment && 
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