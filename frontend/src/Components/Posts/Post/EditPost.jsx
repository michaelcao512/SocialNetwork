import { useState } from "react";
import postService from "../../../Services/post.service";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
function EditPost(props) {
    const  {post, onPostUpdate} = props;
    const [content, setContent] = useState(post.content);
    const [isEditOpen, setIsEditOpen] = useState(false);


    const handleSave = async () => {
        try {
            const updatedPost = { ...post, content };
            await postService.updatePost(updatedPost);
            onPostUpdate();
            setIsEditOpen(false);
        } catch (error) {
            console.log("error updating post: ", error);
        }


    };
    return (<>
        <Button onClick={() => setIsEditOpen(true)}>Edit</Button>
        <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    label="Content"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    </> );
}

export default EditPost;