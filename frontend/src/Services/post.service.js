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

    createPost(content, accountId) {
        const createPostRequest = {
            post: {
                content: content
            },
            accountId: accountId
        }

        return axios.post(api_url, createPostRequest).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getPostsByAccountId(id) {
        return axios.get(`${api_url}/getPostsByAccountId/${id}`, id).then(response => {
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
        return axios.put(`${api_url}/${post.postId}`, post).then(response => {
            console.log("patch response: ", response);
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getAllPostsBesidesOwn() {
        const user = authService.getCurrentUser();
        return axios.get(`${api_url}/getPostsBesidesOwn/${user.id}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }
}

const postService = new PostService();
export default postService;