import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if the error is a 401
    if (error.response?.status === 401) {
      if (error.config.url?.endsWith("/api/me")) {
        return Promise.reject(error);
      }
      console.warn(
        "Session expired on a protected request. Redirecting to login.",
      );
      window.location.href = "/login/patient";
    }

    return Promise.reject(error);
  },
);

export default api;