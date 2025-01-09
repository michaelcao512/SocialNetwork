import { useState } from "react";
import postService from "../../../Services/post.service";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function EditPost(props) {
  const { post, onPostUpdate } = props;
  const [content, setContent] = useState(post.content);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSave = async () => {
    try {
      // Only send necessary fields
      const updatedPost = { ...post, content };
      await postService.updatePost(updatedPost);

      // Call the update callback to refresh the parent
      onPostUpdate(updatedPost);

      // Close the dialog after saving
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsEditOpen(true)}
      >
        Edit
      </Button>
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
    </>
  );
}

export default EditPost;
