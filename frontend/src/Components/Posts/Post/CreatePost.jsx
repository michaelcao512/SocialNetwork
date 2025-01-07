import { FormControl, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import postService from "../../../Services/post.service";
import imageService from "../../../Services/image.service";
import SelectImage from "../../Image/SelectImage";

function CreatePost(props) {
    const { user, onPostCreated } = props;
    const [error, setError] = useState("");
    const [content, setContent] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageSelect = (file) => {
        setSelectedImages([...selectedImages, file]);
        
        // only let user select one image
        // setSelectedImages([file]);
    };

    const handleImageRemove = (index) => {
        const newSelectedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newSelectedImages);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("selectedImages: ", selectedImages);
        if (!content.trim()){
            setError("Post content cannot be empty.");
            return;
        }
        try {
            const uploadedImageIds = [];
            for (const image of selectedImages) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('fileName', image.name);
                formData.append('accountId', user.id);
                formData.append('imageType', 'POST');

                const response = await imageService.uploadFile(formData);
                uploadedImageIds.push(response.imageId);
            }

            const createPostRequest = {
                accountId: user.id,
                content: content,
                imageIds: uploadedImageIds,
            };
            await postService.createPost(createPostRequest);
            onPostCreated();
            setError("");
            setContent("");
            setSelectedImages([]);
        } catch (error) {
            console.log("createPost error: ", error);
        }
    };

    return (
        <Box sx={{  width: '100%', mb: 2 }}>
            <Typography variant="h6" gutterBottom>
                Create a New Post
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }} >
                    <TextField
                        label="Content"
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            setError("");
                        }}
                        variant="outlined"
                        error={!!error}
                        helperText={error}
                    />
                </FormControl>
                <SelectImage onImageSelect={handleImageSelect} selectedImages={selectedImages} handleImageRemove={handleImageRemove}/>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Button fullWidth variant="contained" color="primary" type="submit">
                        Create Post
                    </Button>
                </Box>

            </Box>
        </Box>
    );
}

export default CreatePost;