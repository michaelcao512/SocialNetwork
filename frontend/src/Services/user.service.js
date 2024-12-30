import axios from 'axios';

const api_url = "api/account";

class UserService {

    getAllUsers() {
        return axios.get(api_url).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }

    getUserById(id) {
        return axios.get(api_url + "/" + id).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }

    getAccountOfComment(commentId) {
        return axios.get(`${api_url}/getAccountOfComment/${commentId}`).then(response => {
        return response.data;
    }).catch(error => {
        throw error;
    });
    }

    getAccountOfPost(postId) {
        return axios.get(`${api_url}/getAccountOfPost/${postId}`).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }

    getFollowers(id) {
        return axios.get(`${api_url}/getFollowers/${id}`).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }

    getFollowing(id) {  
        return axios.get(`${api_url}/getFollowing/${id}`).then(response => {
            return response.data;
        }).catch(error => {
            throw error;
        });
    }

    checkEmailExists(email) {
        return axios.get(api_url + "/existsByEmail/" + email)
            .then(response => {
                console.log("response: ", response.data);
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    checkUsernameExists(username) {
        return axios.get(api_url + "/existsByUsername/" + username)
            .then(response => {
                console.log("response: ", response);

                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }
}
const userService = new UserService();
export default userService;