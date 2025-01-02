import  { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import userService from '../../../Services/user.service';
import commentService from '../../../Services/comment.service';
import EditComment from './EditComment';
import { NavLink } from 'react-router-dom';

const CommentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    marginBottom: '1rem',
    boxSizing: 'border-box', // Include padding and border in the element's total width and height
}));

const CommentActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '0.5rem',
}));

function Comment({ user, comment, fetchComments }) {
    const [commentOwner, setCommentOwner] = useState({});
    const [canManageComment, setCanManageComment] = useState(false);
    const [content, setContent] = useState(comment.content);

    useEffect(() => {
        userService.getAccountOfComment(comment.commentId)
            .then(response => {
                setCommentOwner(response);
                if (response.username === user.username) {
                    setCanManageComment(true);
                }
            });
    }, [comment.commentId, user.username]);

    const handleUpdate = (updatedComment) => {
        setContent(updatedComment.content);
        fetchComments();
    };

    const handleDelete = () => {
        commentService.deleteComment(comment.commentId)
            .then(() => {
                fetchComments();
            });
    };
    const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #1976d2;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: #f1356d;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

    return (
        <CommentContainer style={{ backgroundColor: "#f4f9fd",boxShadow: "none" }}>
                <StyledNavLink to={`/profile/${commentOwner.accountId}`}>
                    <Typography variant="h6">{commentOwner.username}</Typography>
                </StyledNavLink>
                    <Typography variant="body2">{content}</Typography>
            
            {canManageComment && (
                <CommentActions>
                    <EditComment comment={comment} onCommentUpdate={handleUpdate}>
                        <Button variant="outlined" size="small">Edit</Button>
                    </EditComment>
                    <Button variant="outlined" size="small" color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </CommentActions>
            )}
        </CommentContainer>
    );
}

export default Comment;