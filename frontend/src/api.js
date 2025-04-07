// here we are creating an axios instance with a base URL and adding an interceptor to include the access token in the headers of each request
// interceptor will intercept any req that we send and it will automatically add the correct header so we dont need to do it manually every time 
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

//const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

// this allows us to import anything inside the .env file and use it in our code
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL //? import.meta.env.VITE_API_URL : apiUrl,
});

//interceptors
//look inside the local storage for the access token and add it to the headers of the request
// this is done so that we dont have to manually add the access token to every request we make to the backend
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // add the token to the headers of the request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; // now we use this api object rather than using axios directly