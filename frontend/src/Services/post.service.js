import axios from "axios";
import authService from "./auth.service";

const api_url = "api/post";

class PostService {
    getAllPosts() {
        return axios.get(api_url).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);});
    }

    createPost(post) {
        return axios.post(api_url, post).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getOwnPosts() {
        const user = authService.getCurrentUser();
        return axios.get(`${api_url}/getPostsByAccountId/${user.id}`, user.id).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getPostById(id) {
        return axios.get(`${api_url}/posts/${id}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    deletePost(id) {
        return axios.delete(`${api_url}/${id}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    updatePost(post) {
        return axios.patch(`${api_url}/${post.postId}`, post).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }
}

export default new PostService();