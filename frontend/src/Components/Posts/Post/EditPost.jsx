import { useEffect, useState } from "react";
import postService from "../../../Services/post.service";
import imageService from "../../../Services/image.service";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Input, Typography, IconButton } from "@mui/material";
import SelectImage from "../../Image/SelectImage";
import Image from "../../Image/Image";
function EditPost({ user, post, onPostUpdate, onClose }) {
    const [content, setContent] = useState(post.content);
    const [existingImages, setExistingImages] = useState(post.images || []);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        setContent(post.content);
        setExistingImages(post.images || []);
        setSelectedImages([]);
    }, [post]);

    const handleImageSelect = (file) => {
        setSelectedImages((selectedImages) => [...selectedImages, file]);
    };

    const handleImageRemove = (index) => {
        const newSelectedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(newSelectedImages);
    };
    const handleExistingImageRemove = (index) => {
        setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        onClose();
        setSelectedImages([]);
        setContent(post.content);
    };
    const handleSave = async () => {
        try {
            console.log("user", user);
            // handle content and imageIds didn't change and cancel edit if necessary
            if (content === post.content && selectedImages.length === 0 && existingImages.length === post.images.length) {
                onClose();
                return;
            }

            const newImageIds = [];
            for (const image of selectedImages) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("fileName", image.name);
                formData.append("accountId", user.accountId);
                formData.append("imageType", "POST");
                const imageResponse = await imageService.uploadFile(formData);

                newImageIds.push(imageResponse.imageId);
            }

            const allImageIds = [...existingImages.map((img) => img.imageId), ...newImageIds];

            const updatePostRequest = {
                postId: post.postId,
                accountId: user.accountId,
                content: content,
                imageIds: allImageIds,
            };
            await postService.updatePost(updatePostRequest);
            onPostUpdate();
            onClose();
        } catch (error) {
            console.error("Error updating post: ", error);
        }
    };

    return (
        <>
            <Dialog open={true} onClose={handleCancel} maxWidth="sm" fullWidth>
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
                        variant="standard"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />

                    {existingImages.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                Existing Images:
                            </Typography>

                            <Image images={existingImages} deleteOption={true} handleImageRemove={handleExistingImageRemove} />
                        </Box>
                    )}
                    <SelectImage onImageSelect={handleImageSelect} selectedImages={selectedImages} handleImageRemove={handleImageRemove} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditPost;
