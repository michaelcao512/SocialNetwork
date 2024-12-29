import axios from "axios";

const api_url = "api/post";

class SearchService {
    searchPosts(query) {
        return axios
            .get(`${api_url}/searchPosts?query=${encodeURIComponent(query)}`)
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    // Backend returned an error
                    console.error(`Search error: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    // No response from backend
                    console.error("Search request error:", error.request);
                } else {
                    // Other errors
                    console.error("Error:", error.message);
                }
                throw error;
            });
    }
}

const searchService = new SearchService();
export default searchService;
