import axios from "axios";

const api_url = "api/reactions";

class ReactionsService {
    getReactionByPostIdAndAccountId(postId, accountId) {
        return axios.get(`${api_url}/getReactionByPostIdAndAccountId/${postId}/${accountId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getLikeCountByPostId(postId) {
        return axios.get(`${api_url}/getLikeCountByPostId/${postId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getDislikeCountByPostId(postId) {
        return axios.get(`${api_url}/getDislikeCountByPostId/${postId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    // handles creating a new reaction
    // also handles updating a reaction if reaction type is different
    // or deleting a reaction if reaction type is the same
    createReaction(reactionType, postId, accountId) {
        const reactionRequest = {
            reactionType: reactionType,
            postId: postId,
            accountId: accountId
        }

        return axios.post(api_url, reactionRequest).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    deleteReaction(reactionId) {
        return axios.delete(`${api_url}/${reactionId}`).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }
    

}

const reactionsService = new ReactionsService();
export default reactionsService;