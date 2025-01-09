import React, { useState, useEffect, useCallback } from "react";
import PostReactions from "../PostReactions";
import DisplayComments from "../Comments/DisplayComments";
import CreateComment from "../Comments/CreateComment";
import userService from "../../../Services/user.service";
import commentService from "../../../Services/comment.service";
import { StandardContainer } from "../../../StyledComponents/StyledComponents";
import PostHeader from "../PostHeader";
import PostContent from "../PostContent";

function Post(props) {
    const { post, user, onPostDelete, onPostUpdate } = props;
    const [postOwner, setPostOwner] = useState("");
    const [canManagePost, setCanManagePost] = useState(false);
    const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        try {
            userService.getAccountOfPost(post.postId).then((response) => {
                setPostOwner(response);
                if (response.username === user.username) {
                    setCanManagePost(true);
                }
            });
        } catch (error) {
            console.log("Error fetching post owner: ", error);
        }
    }, [post.postId, user.username]);

    const fetchComments = useCallback(() => {
        commentService.getCommentsByPostId(post.postId).then((response) => {
            setComments(response);
        });
    }, [post.postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleAddCommentClick = () => {
        setIsCommentInputVisible(() => !isCommentInputVisible);
    };

    const handleCancelComment = () => {
        setIsCommentInputVisible(false);
    };

    return (
        <StandardContainer style={{ marginBottom: "1rem" }}>
            <PostHeader user={user} postOwner={postOwner} post={post} canManagePost={canManagePost} onPostUpdate={onPostUpdate} onPostDelete={onPostDelete} />
            <PostContent entity={post} />
            <PostReactions entityId={post.postId} entityType="post" user={user} comments={comments} onAddCommentClick={handleAddCommentClick} />
            {isCommentInputVisible && <CreateComment post={post} user={user} fetchComments={fetchComments} onCancel={handleCancelComment} />}
            <DisplayComments user={user} comments={comments} fetchComments={fetchComments} />
        </StandardContainer>
    );
}

export default Post;
