import axios from "axios";

const api_url = "api/image";

class ImageService {
    uploadFile(uploadFileRequest) {
        return axios.post(api_url, uploadFileRequest, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log('Image uploaded successfully:', response.data);
            return response.data;
        }).catch(error => {
            throw error;
        });
    }
    deleteImage(imageId) {
        return axios.delete(`${api_url}/${imageId}`).then(response => {
            console.log('Image deleted successfully:', response.data);
            return response.data;
        }).catch(error => {
            throw error;
        });
    }
    getPresignedUrl(key) {
        return axios.get(`${api_url}/getPresignedUrl/${key}`).then(response => {
            console.log('Presigned URL fetched successfully:', response.data);
            return response.data;
        }).catch(error => {
            throw error;
        });
    }

}

const imageService = new ImageService();
export default imageService;