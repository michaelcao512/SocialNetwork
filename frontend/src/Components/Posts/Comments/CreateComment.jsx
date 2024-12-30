import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import commentService from '../../../Services/comment.service';

const CreateCommentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    marginBottom: '2rem',
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
}));

const FullWidthTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '1rem',
    width: '100%',
}));

const FullWidthButton = styled(Button)(({ theme }) => ({
    width: '48%',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

function CreateComment(props) {
    const { post, user, parentComment, fetchComments, onCancel } = props;
    const [content, setContent] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const postId = post ? post.postId : null;
        const parentCommentId = parentComment ? parentComment.commentId : null;
        try {
            await commentService.createComment(content, user.id, postId, parentCommentId);
            fetchComments();
            setContent("");
            onCancel();
        } catch (error) {
            console.log("createComment error: ", error);
        }
    }

    return (
        <CreateCommentContainer component="form" onSubmit={handleSubmit}>
            <FullWidthTextField
                label="Add a comment"
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" width="100%">
                <FullWidthButton variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </FullWidthButton>
                <FullWidthButton type="submit" variant="contained" color="primary">
                    Post Comment
                </FullWidthButton>
 
            </Box>
        </CreateCommentContainer>
    );
}

export default CreateComment;