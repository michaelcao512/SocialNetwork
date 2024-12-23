import axios from "axios";
import authService from "./auth.service";

const api_url = "api/comment";

class CommentService {
    getCommentsByPostId(postId) {
        return axios.get(`${api_url}/getCommentsByPostId/${postId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getAccountOfComment(commentId) {
        return axios.get(`${api_url}/getAccountOfComment/${commentId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    // 
    createComment(content, accountId, postId) {
        const commentRequest = {
            content: content,
            accountId: accountId,
            postId: postId
        }
        return axios.post(api_url, commentRequest).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    deleteComment(commentId) {
        return axios.delete(`${api_url}/${commentId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    updateComment(comment) {
        return axios.patch(`${api_url}/${comment.commentId}`, comment).then(response => {
            console.log("patch response: ", response);
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

}
export default new CommentService();