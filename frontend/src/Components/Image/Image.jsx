import { useEffect, useState } from "react";
import imageService from "../../Services/image.service";

function Image({ images }) {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        console.log("images", images);
        const fetchImages = async () => {
            try {
                const urls = await Promise.all(
                    images.map(async (image) => {
                        const newUrl = await imageService.getPresignedUrl(image.bucketKey);
                        return newUrl;
                    })
                );
                setImageUrls(urls);
                console.log("imageUrls", urls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [images]);

    return (
        <div>
            {imageUrls.map((url, index) => (
                <img key={index} src={url} alt="Post" style={{ maxWidth: '100%' }} />
            ))}
        </div>
    );
}

export default Image;