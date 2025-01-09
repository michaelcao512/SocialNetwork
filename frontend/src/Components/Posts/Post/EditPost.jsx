import { useEffect, useState } from "react";
import postService from "../../../Services/post.service";
import imageService from "../../../Services/image.service";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Typography,
} from "@mui/material";
import SelectImage from "../../Image/SelectImage";
import { Edit } from "@mui/icons-material";
import Image from "../../Image/Image";
import authService from "../../../Services/auth.service";

function EditPost({ post, onPostUpdate }) {
    const user = authService.getCurrentUser();
    const [content, setContent] = useState(post.content);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [error, setError] = useState("");
    const [existingImages, setExistingImages] = useState(post.images || []);
    const [selectedImages, setSelectedImages] = useState([]);

    const MAX_CONTENT_LENGTH = 255;

    useEffect(() => {
        setContent(post.content);
        setExistingImages(post.images || []);
        setSelectedImages([]);
    }, [post]);

    const handleClose = () => {
        setIsEditOpen(false);
        setSelectedImages([]);
        setContent(post.content || "");
        setError("");
    };

    const handleSave = async () => {
        if (!user || !user.id) {
            setError("Error: User is not authenticated.");
            console.error("Error: User is undefined or missing ID.");
            return;
        }

        if (!content.trim()) {
            setError("Post content cannot be empty.");
            return;
        }

        if (content.length > MAX_CONTENT_LENGTH) {
            setError(`Post content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
            return;
        }

        try {
            const newImageIds = [];
            for (const image of selectedImages) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("fileName", image.name);
                formData.append("accountId", user.id);
                formData.append("imageType", "POST");
                const imageResponse = await imageService.uploadFile(formData);
                newImageIds.push(imageResponse.imageId);
            }

            const allImageIds = [
                ...existingImages.map((img) => img.imageId),
                ...newImageIds,
            ];

            const updatePostRequest = {
                postId: post.postId,
                accountId: user.id,
                content: content,
                imageIds: allImageIds,
            };

            await postService.updatePost(updatePostRequest);
            onPostUpdate({ ...post, content, images: allImageIds });
            handleClose();
        } catch (error) {
            console.error("Error updating post: ", error);
            setError("Failed to update the post. Please try again later.");
        }
    };

    return (
        <>
            <Button
                onClick={() => setIsEditOpen(true)}
                startIcon={<Edit />}
                color="primary"
                size="small"
                variant="outlined"
            >
                Edit
            </Button>
            <Dialog open={isEditOpen} onClose={handleClose}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={content}
                        onChange={(event) => {
                            const value = event.target.value;
                            setContent(value);

                            if (!value.trim()) {
                                setError("Post content cannot be empty.");
                            } else if (value.length > MAX_CONTENT_LENGTH) {
                                setError(`Post content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
                            } else {
                                setError("");
                            }
                        }}
                        error={!!error}
                        helperText={error || `${content.length}/${MAX_CONTENT_LENGTH} characters`}
                    />

                    {existingImages.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                Existing Images:
                            </Typography>
                            <Image
                                images={existingImages}
                                deleteOption={true}
                                handleImageRemove={(index) =>
                                    setExistingImages((prev) => prev.filter((_, i) => i !== index))
                                }
                            />
                        </Box>
                    )}

                    <SelectImage
                        onImageSelect={(file) => setSelectedImages((prev) => [...prev, file])}
                        selectedImages={selectedImages}
                        handleImageRemove={(index) =>
                            setSelectedImages((prev) => prev.filter((_, i) => i !== index))
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditPost;