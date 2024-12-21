import axios from 'axios';


const api_url = "auth";

class AuthService {
    login(loginRequest) {
        console.log("login request: ", loginRequest);
        return axios.post(
            api_url + "/login", loginRequest)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;

                }
                console.log("login response: ", response);
                return response.data;
            })
            .catch(error => {
                console.log("login error: ", error);
            });
    }
    logout() {
        localStorage.removeItem("user");
        delete axios.defaults.headers.common['Authorization'];
    }

    register(registerRequest) {
        console.log("registration request: ", registerRequest)
        const data = axios.post(api_url + "/register", registerRequest)
            .then(response => {
                console.log("registration response: ", response);
                return response.data;
            })
            .catch(error => {
                console.log("registration error: ", error);
            }); 
        return data;
        
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();