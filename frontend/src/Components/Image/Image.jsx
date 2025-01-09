import { useEffect, useState } from "react";
import imageService from "../../Services/image.service";
import { IconButton, Box, Grid2 } from "@mui/material";
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
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, [images]);

    return (
        <Grid2 container spacing={2}>
            {imageUrls.map((url, index) => (
                <Grid2 item xs={12} sm={6} md={4} key={index}>
                    <Box sx={{ position: "relative" }}>
                        <img src={url} alt="Post" style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                        {deleteOption && (
                            <IconButton onClick={() => handleImageRemove(index)} color="secondary" sx={{ position: "absolute", top: 0, right: 0 }}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                </Grid2>
            ))}
        </Grid2>
    );
}

export default Image;
