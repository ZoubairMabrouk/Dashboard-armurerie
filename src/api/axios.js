import axios from "axios";
const Instance = axios.create({
    baseURL:"http://localhost:8000/api"
})
Instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Add the Bearer token
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  export default Instance;