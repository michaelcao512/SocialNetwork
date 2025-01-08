import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import postService from "../Services/post.service";
import DisplayPosts from "../Components/Posts/Post/DisplayPosts";
import { StyledStack } from "../StyledComponents/StyledComponents";

const PostsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "800px",
  margin: "auto",
}));

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomePosts();
  }, []);

  async function fetchHomePosts() {
    try {
      const response = await postService.getHomePosts(user.id);
      setPosts(response);
    } catch (error) {
      console.error("Error fetching feed posts: ", error);
    }
  }

  return (
    <StyledStack>
      {posts.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" gutterBottom>
            No posts available from followed accounts.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Explore and follow users to see their posts here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/allposts")}
            sx={{ mt: 2 }}
          >
            Go explore
          </Button>
        </Box>
      ) : (
        <PostsContainer>
          <DisplayPosts posts={posts} user={user} />
        </PostsContainer>
      )}
    </StyledStack>
  );
}

export default FeedPage;