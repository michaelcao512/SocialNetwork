import { useState, useEffect, useCallback } from "react";
import reactionsService from "../../../Services/reactions.service";
import styled from "@emotion/styled";
import { IconButton, Box, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, ThumbDown, ThumbDownOffAlt, AddComment } from '@mui/icons-material';
import commentService from "../../../Services/comment.service";

const ReactionsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
}));

const ReactionIconButton = styled(IconButton)(({ theme, active }) => ({
    color: active ? theme.palette.primary.main : theme.palette.grey[500],
    '&:hover': {
        color: active ? theme.palette.primary.dark : theme.palette.grey[700],
    },
}));

const IndentedTypography = styled(Typography)(({ theme }) => ({
    marginLeft: '0.5rem',
}));

function DisplayReactions(props) {
    const { post, user, onAddCommentClick } = props;
    const postId = post.postId;
    const [numLikes, setNumLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);
    const [ numComments, setNumComments ] = useState(0);
    const [reaction, setReaction] = useState(null);

    const fetchData = useCallback(() => {
        reactionsService.getLikeCountByPostId(postId)
            .then(response => {
                setNumLikes(response);
            });
        reactionsService.getDislikeCountByPostId(postId)
            .then(response => {
                setNumDislikes(response);
            });
        reactionsService.getReactionByPostIdAndAccountId(postId, user.id)
            .then(response => {
                setReaction(response);
            });
        
        commentService.getCommentsCountByPostId(postId)
            .then(response => {
                setNumComments(response);
        })
    }, [postId, user.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    function handleLikeClick() {
        if (reaction != null && reaction.reactionType === "LIKE") {
            reactionsService.deleteReaction(reaction.reactionId)
                .then(() => {
                    fetchData();
                });
        } else {
            reactionsService.createReaction("LIKE", postId, user.id)
                .then(() => {
                    fetchData();
                });
        }
    }

    function handleDislikeClick() {
        if (reaction != null && reaction.reactionType === "DISLIKE") {
            reactionsService.deleteReaction(reaction.reactionId)
                .then(() => {
                    fetchData();
                });
        } else {
            reactionsService.createReaction("DISLIKE", postId, user.id)
                .then(() => {
                    fetchData();
                });
        }
    }

    return (
        <ReactionsContainer>
            <Box display="flex" alignItems="center">
                <ReactionIconButton
                    active={reaction?.reactionType === "LIKE"}
                    onClick={handleLikeClick}
                >
                    {reaction?.reactionType === "LIKE" ? <Favorite /> : <FavoriteBorder />}
                </ReactionIconButton>
                <IndentedTypography variant="body2">{numLikes}</IndentedTypography>
            </Box>
            <Box display="flex" alignItems="center">
                <ReactionIconButton
                    active={reaction?.reactionType === "DISLIKE"}
                    onClick={handleDislikeClick}
                >
                    {reaction?.reactionType === "DISLIKE" ? <ThumbDown /> : <ThumbDownOffAlt />}
                </ReactionIconButton>
                <IndentedTypography variant="body2">{numDislikes}</IndentedTypography>
            </Box>
            <Box display="flex" alignItems="center">
                <ReactionIconButton onClick={onAddCommentClick} color="primary">
                    <AddComment />
                    <IndentedTypography variant="body2">{numComments}</IndentedTypography>
                </ReactionIconButton>
            </Box>
        </ReactionsContainer>
    );
}

export default DisplayReactions;