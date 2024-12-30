import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import userService from '../../../Services/user.service';
import commentService from '../../../Services/comment.service';
import EditComment from './EditComment';
import { NavLink } from 'react-router-dom';
import DisplayReactions from '../Reactions/DisplayReactions';

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

const RepliesContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 'calc(100% - 1rem)', // Ensure it takes the full width minus the left margin
    marginLeft: '1rem',
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
    })
    .catch(error => {
        console.error("Error fetching comment owner:", error);
    });

    }, [comment.commentId, user.username]);

    const handleUpdate = (updatedContent) => {
        setContent(updatedContent);
        fetchComments();
    };

    const handleDelete = () => {
        commentService.deleteComment(comment.commentId)
            .then(() => {
                fetchComments();
            });
    };

    return (
        <CommentContainer>
                <NavLink to={`/profile/${commentOwner.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h6">{commentOwner.username}</Typography>
                </NavLink>
                    <Typography variant="body2">{content}</Typography>
                    <Typography variant="caption">
                        {comment.dateCreated
                        ? new Date(comment.dateCreated).toLocaleString()
                        : "No timestamp available"}
                    </Typography>

                    

            <DisplayReactions
                entityId={comment.commentId}
                entityType="comment"
                user={user}
                reactions={comment.reactions || []}
            />
            
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
            <RepliesContainer>
                {comment.replies && comment.replies.map(reply => (
                    <Comment key={reply.commentId} user={user} comment={reply} fetchComments={fetchComments} />
                ))}
            </RepliesContainer>
        </CommentContainer>
    );
}

export default Comment;