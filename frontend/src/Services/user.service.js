import axios from 'axios';
import authHeader from './auth-header';

const api_url = "api/account";

class UserService {

    getAllUsers() {
        return axios.get(api_url).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }

    getUserById(id) {
        return axios.get(api_url + "/" + id).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }


}

export default new UserService();