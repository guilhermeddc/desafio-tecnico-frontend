import axios from "axios";
import { sessionService } from "../api";

const baseURL = "http://localhost:5000/";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      sessionService.signOut();
    }

    return Promise.reject(error);
  }
);
