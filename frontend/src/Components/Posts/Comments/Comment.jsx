import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import styled from "@emotion/styled";
import userService from "../../../Services/user.service";
import commentService from "../../../Services/comment.service";
import EditComment from "./EditComment";
import DisplayReactions from "../Reactions/DisplayReactions";
import CreateComment from "./CreateComment";
import {
  PostHeader,
  StyledNavLink,
} from "../../../StyledComponents/StyledComponents";
import { Delete } from "@mui/icons-material";
const CommentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "0.5rem",
  paddingRight: 0,
  backgroundColor: theme.palette.background.main,
  boxShadow: "none",
  color: theme.palette.text.primary,
  width: "100%",
  marginBottom: "1rem",
  boxSizing: "border-box",
}));

const CommentActions = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "0.5rem",
  marginTop: "0.5rem",
}));

const RepliesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "calc(100% - 1rem)",
  marginLeft: "1rem",
}));

function Comment({ user, comment, fetchComments }) {
  const [commentOwner, setCommentOwner] = useState({});
  const [canManageComment, setCanManageComment] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);

  useEffect(() => {
    userService
      .getAccountOfComment(comment.commentId)
      .then((response) => {
        setCommentOwner(response);
        if (response.username === user.username) {
          setCanManageComment(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching comment owner:", error);
      });
  }, [comment.commentId, user.username]);

  const handleUpdate = (updatedContent) => {
    setContent(updatedContent);
    fetchComments();
  };

  const handleDelete = () => {
    commentService.deleteComment(comment.commentId).then(() => {
      fetchComments();
    });
  };

  const handleAddCommentClick = () => {
    setIsCommentInputVisible(() => !isCommentInputVisible);
  };

  const handleCancelComment = () => {
    setIsCommentInputVisible(false);
  };

  return (
    <CommentContainer>
      <PostHeader>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={commentOwner?.userInfo?.avatarUrl || null}
            sx={{ marginRight: "0.25rem" }}
          >
            {commentOwner?.userInfo?.firstName?.charAt(0) || "#"}
          </Avatar>
          <StyledNavLink to={`/profile/${commentOwner.accountId}`}>
            <Typography variant="h6">{commentOwner.username}</Typography>
            <Typography variant="caption">
              {comment.dateCreated
                ? new Date(comment.dateCreated).toLocaleString()
                : "No timestamp available"}
            </Typography>
          </StyledNavLink>
        </Box>
      </PostHeader>

      <Typography variant="body2">{content}</Typography>

      <DisplayReactions
        entityId={comment.commentId}
        entityType="comment"
        user={user}
        reactions={comment.reactions || []}
        onAddCommentClick={handleAddCommentClick}
      />

      {isCommentInputVisible && (
        <CreateComment
          user={user}
          parentComment={comment}
          fetchComments={fetchComments}
          onCancel={handleCancelComment}
        />
      )}

      {canManageComment && (
        <CommentActions>
          <EditComment comment={comment} onCommentUpdate={handleUpdate}>
            <Button variant="outlined" size="small">
              Edit
            </Button>
          </EditComment>
          <Button
            startIcon={<Delete />}
            variant="outlined"
            size="small"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CommentActions>
      )}
      <RepliesContainer>
        {comment.replies &&
          comment.replies.map((reply) => (
            <Comment
              key={reply.commentId}
              user={user}
              comment={reply}
              fetchComments={fetchComments}
            />
          ))}
      </RepliesContainer>
    </CommentContainer>
  );
}

export default Comment;
