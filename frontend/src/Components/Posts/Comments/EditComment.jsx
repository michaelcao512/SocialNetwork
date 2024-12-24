import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

function EditComment(props) {  
    const { comment, onCommentUpdate } = props;
    const [content, setContent] = useState(comment.content);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleSave = () => {
        const updatedComment = {
            ...comment,
            content
        }
        
        onCommentUpdate(updatedComment);
        setIsEditOpen(false);
    }

    return (  
        <>
            <Button onClick={() => setIsEditOpen(true)}>Edit</Button>
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditComment;