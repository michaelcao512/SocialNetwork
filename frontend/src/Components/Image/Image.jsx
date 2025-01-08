import { useEffect, useState } from "react";
import imageService from "../../Services/image.service";
import { IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Image({ images, deleteOption, handleImageRemove }) {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const urls = await Promise.all(
                    images.map(async (image) => {
                        const newUrl = await imageService.getPresignedUrl(image.bucketKey);
                        return newUrl;
                    })
                );
                setImageUrls(urls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [images]);

    return (
        
        <>
            {imageUrls.map((url, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <img key={index} src={url} alt="Post" style={{ maxWidth: '100%' }} />
                    {deleteOption && (
                        <IconButton onClick={() => handleImageRemove(index)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}

        </>

    );
}

export default Image;