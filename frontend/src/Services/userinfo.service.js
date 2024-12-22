import axios from 'axios';
import authHeader from './auth-header';

const api_url = "api/userinfo";

class UserInfoService {

    getUserInfoById(id) {
        return axios.get(api_url + "/" + id).then(response => {
            return response.data;
        }).catch(error => {
            console.log("error: ", error);
        });
    }


}

export default new UserInfoService();