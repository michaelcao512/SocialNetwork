import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledNavLink } from "../../../StyledComponents/StyledComponents";
import EditPost from "./EditPost";
import { Edit, Delete } from "@mui/icons-material";
import postService from "../../../Services/post.service";

function PostHeader({ user, postOwner, post, canManagePost, onPostUpdate, onPostDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setIsEditOpen(true);
        handleMenuClose();
    };

    const handleEditClose = () => {
        setIsEditOpen(false);
    };

    const handleDeleteClick = () => {
        postService
            .deletePost(post.postId)
            .then(() => onPostDelete())
            .catch((error) => console.log("Delete post error: ", error));
        handleMenuClose();
    };
    return (
        <>
            <Box style={{ display: "flex", flexDirection: "row" }} width={"100%"} justifyContent={"space-between"} marginBottom={"1rem"}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={postOwner?.userInfo?.avatarUrl || null} sx={{ marginRight: "0.5rem" }}>
                        {postOwner?.userInfo?.firstName?.charAt(0) || "#"}
                    </Avatar>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                        <StyledNavLink to={`/profile/${postOwner.accountId}`}>
                            <Typography variant="h6">{postOwner.username}</Typography>
                        </StyledNavLink>
                        <Typography variant="caption">
                            {post.dateCreated
                                ? new Intl.DateTimeFormat("en-US", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  }).format(new Date(post.dateCreated))
                                : "No timestamp available"}
                        </Typography>{" "}
                    </Box>
                </Box>
                <Box style={{ alignSelf: "flex-end" }}>
                    {canManagePost && (
                        <IconButton onClick={handleMenuOpen} style={{ marginLeft: "auto" }}>
                            <MoreVertIcon />
                        </IconButton>
                    )}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleEditClick}>
                            <ListItemIcon>
                                <Edit color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Edit post" />
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            <ListItemIcon>
                                <Delete color="error" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Delete post" />
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
            {isEditOpen && <EditPost user={postOwner} post={post} onPostUpdate={onPostUpdate} onClose={handleEditClose} />}
        </>
    );
}

export default PostHeader;
