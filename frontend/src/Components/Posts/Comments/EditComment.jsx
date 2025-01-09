import { useState } from "react";
import commentService from "../../../Services/comment.service";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

function EditComment(props) {
  const { comment, onCommentUpdate } = props;
  const [content, setContent] = useState(comment.content);
  const [isEditOpen, setIsEditOpen] = useState(false);

  //new changes by Tyson to make work the same as edit post. fix will write to DB
  const handleSave = async () => {
    try {
      // Only send necessary fields
      const updatedComment = { ...comment, content };
      await commentService.updateComment(updatedComment);

      // Call the update callback to refresh the parent
      onCommentUpdate(updatedComment);

      // Close the dialog after saving
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating comment: ", error);
    }
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={() => setIsEditOpen(true)}
      >
        Edit
      </Button>
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
          <Button color="secondary" onClick={() => setIsEditOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditComment;
