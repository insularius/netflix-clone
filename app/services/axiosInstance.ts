import {
  BASE_GRIFFON_URL,
  CMS_ROOT,
  GRIFFON_CHECK_URL,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
  GRIFFON_REGISTER_URL,
  GRIFFON_VERIFY_URL,
} from "./../constants/constants";

import axios from "axios";
import { getIdToken, refreshToken } from "../types/authProvide";
import { RegisterResponse } from "../types/griffon";

const instance = axios.create({
  baseURL: BASE_GRIFFON_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getIdToken()}`;
    console.log("Making request with config: ", config.headers.Authorization);
    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        console.log("Token expired, running refreshToken");
        const newTokens = await refreshToken();
        if (newTokens && error.config) {
          error.config.headers = error.config.headers || {};
          error.config.headers.Authorization = `Bearer ${newTokens.id_token}`;
          return instance(error.config);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
