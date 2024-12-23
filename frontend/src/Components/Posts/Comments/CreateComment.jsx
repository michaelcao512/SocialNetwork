import { useState } from "react";
import commentService from "../../../Services/comment.service";
function CreateComment(props) {
    const { post, user, fetchComments } = props;
    const [content, setContent] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setContent("");
        
        try {
            commentService.createComment(content, user.id, post.postId)
            .then(response => {
                fetchComments();
            })
        } catch (error) {
            console.log("createComment error: ", error);
        }

    }

    return (
        <div>
            <form>
                <input type="text" value = {content} onChange={(e) => setContent(e.target.value)} placeholder="Comment content" />
                <button type="submit" onClick={handleSubmit}>Create Comment</button>
            </form>
        </div>
      );
}

export default CreateComment;