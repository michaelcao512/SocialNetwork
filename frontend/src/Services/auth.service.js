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

    async register(registerRequest) {
        try {
            const response = await axios.post(api_url + "/register", registerRequest);
            return response.data;

        } catch (error) {
            const errorMessage = error.response.data;
            alert(errorMessage);
            throw error;
        }
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

}

const authService = new AuthService();
export default authService;