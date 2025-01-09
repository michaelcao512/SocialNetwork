import React from 'react';
import { Box, Typography, IconButton, Button, Input } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function SelectImage({ selectedImages, onImageSelect, handleImageRemove }) {
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    onImageSelect(file);
                };
                reader.readAsDataURL(file);
            });
        }
        event.target.value = null;
    };

    return (
        <Box>
            {selectedImages.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        Selected Images:
                    </Typography>
                    {selectedImages.map((image, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <img src={URL.createObjectURL(image)} alt="Selected" />
                            <IconButton onClick={() => handleImageRemove(index)} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}
            <Button
                component="label"
                variant="outline"
                color="primary"
                startIcon={<UploadFileIcon />}
                >
                Upload Images
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={handleFileChange} />
            </Button>
        </Box>
    );
}

export default SelectImage;