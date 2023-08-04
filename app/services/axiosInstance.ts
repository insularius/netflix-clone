import {
  BASE_GRIFFON_URL,
  GRIFFON_CHECK_URL,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
  GRIFFON_REGISTER_URL,
  GRIFFON_VERIFY_URL,
} from "./../constants/constants";

import axios from "axios";
import { getIdToken, refreshToken } from "../types/authProvide";
import { RegisterResponse } from "../types/griffon";

// const getIdToken = (): string | null => {
//   try {
//     const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
//     if (!storedTokens) {
//       console.log("No stored tokens found");
//       return null;
//     }
//     const tokens: AuthTokens = JSON.parse(storedTokens);
//     return tokens.id_token ? tokens.id_token : null;
//   } catch (e) {
//     console.error(e);
//     return null;
//   } finally {
//     console.log(`getIdToken вызвался`);
//   }
// };

const instance = axios.create({
  baseURL: BASE_GRIFFON_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getIdToken()}`;
    // console.log("Making request with config: ", config.headers.Authorization);
    return config;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (axios.isAxiosError(error) && error.response?.status === 401) {
//       token = getIdToken();
//       error.config.headers["Authorization"] = `Bearer ${token}`;
//       return instance(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

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

// instance.interceptors.request.use();
export default instance;
