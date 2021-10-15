import axios from "axios";
import jwtManager from "helper/jwtManager";

// Add a request interceptor
export default function configAxios() {
  axios.defaults.baseURL = process.env.REACT_APP_API;

  axios.interceptors.request.use(
    (config) => {
      const token = jwtManager.get();
      const newConfig = { ...config };
      if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }

      return newConfig;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}
