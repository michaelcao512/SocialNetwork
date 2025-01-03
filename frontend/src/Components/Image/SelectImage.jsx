import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {Typography, IconButton} from '@mui/material';
function SelectImage({ onImageSelect, selectedImages, handleImageRemove }) {
    const fileInputRef = useRef(null);

    const handleButtonClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageSelect(file);
                fileInputRef.current.value = '';
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />

                {selectedImages.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            Selected Images:
                        </Typography>
                        {selectedImages.map((image, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <img src={URL.createObjectURL(image)} alt="Selected" style={{ maxWidth: '100px', marginRight: '10px' }} />
                                <IconButton onClick={() => handleImageRemove(index)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                )}
            <button onClick={handleButtonClick}>Select Image</button>

        </Box>
    );
}

export default SelectImage;