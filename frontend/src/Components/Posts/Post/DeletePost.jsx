import { Button } from "@mui/material";
import postService from "../../../Services/post.service";
import { Delete } from "@mui/icons-material";

function DeletePost(props) {
    const { post, onPostDelete } = props;
    

    function handleClick() {
        postService.deletePost(post.postId)
            .then(() => onPostDelete())
            .catch((error) => console.log("Delete post error: ", error));
    }

    return ( 
        <Button
            onClick={() => handleClick()}
            startIcon={<Delete />}
            color="error"
            size="small"
            variant="outlined">
            Delete
        </Button>
     );
}

export default DeletePost;