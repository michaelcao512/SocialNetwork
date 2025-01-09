import React from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledPostContent = styled(Typography)(({ theme }) => ({
    textAlign: "left",
    marginBottom: "1rem",
    width: "100%",
    border: "none",
    boxShadow: "none",
}));

function PostContent({ content }) {
    return <StyledPostContent variant="body1">{content}</StyledPostContent>;
}

export default PostContent;
