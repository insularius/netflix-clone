"use client";
import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";

import {
  BASE_GRIFFON_URL,
  GRIFFON_SIGNUP_URL,
  GRIFFON_VERIFY_URL,
  CODE,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
  PASSWORD_PAGE,
  GRIFFON_MY_BUCKET,
  GRIFFON_CHECK_URL,
  GRIFFON_REGISTER_URL,
  TOKEN_STORAGE_KEY,
  GRIFFON_PROFILE_URL,
  PROFILE_STORAGE_KEY,
  GRIFFON_TOKEN_URL,
  GRIFFON_PASSWORD_RESET_URL,
  GRIFFON_RESET_VERIFY,
  GRIFFON_USER_EMAIL,
  GRIFFON_EMAIL_VERIFY_CODE,
  GRIFFON_RESET_PASSWORD,
  GRIFFON_PROFILE_AVATAR,
  SIGNUP_PARAMS,
} from "../constants/constants";
import {
  SignUpResponse,
  SendOtpResponse,
  RegisterResponse,
  AuthTokens,
  ProfileUpdateDTO,
  Profile,
  ResetPasswordResponseDto,
} from "../types/griffon";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import instance from "../services/axiosInstance";
import { sendOtp } from "../types/authService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

interface AuthContextProps {
  sid: string;
  setSid: (sid: string) => void;
  profile: Profile | undefined;
  setProfile: (profile: Profile) => void;
  isAuthorized: boolean;
  setIsAuthorized: (condition: boolean) => void;
  isRedirectAllowed: boolean;
  setIsRedirectAllowed: (condition: boolean) => void;
  signup: (username: string) => void;
  // sendOtp: (code: string, sid?: string) => void;
  // checkIfUserExists: (username: string) => Promise<boolean>;
  register: (sid: string, password: string) => Promise<RegisterResponse>;
  // getIdToken: () => string | null;
  createProfile: (data: ProfileUpdateDTO) => Promise<ProfileUpdateDTO>;
  getProfile: () => Promise<any>;
  persistProfile: (profile: Profile) => void;
  persistTokens: (tokens: AuthTokens) => void;
  refreshToken: () => Promise<AuthTokens>;
  // updateProfile: (data: ProfileUpdateDTO) => Promise<ProfileUpdateDTO>;
  logout: () => void;
}

export const Auth = createContext<AuthContextProps>({
  sid: "",
  setSid: () => {},
  profile: {},
  setProfile: () => {},
  isAuthorized: false,
  setIsAuthorized: () => {},
  signup: () => {},
  // sendOtp: () => Promise.resolve(),
  // checkIfUserExists: () => Promise.resolve(true),
  register: () =>
    Promise.resolve({
      access_token: "",
      refresh_token: "",
      token_type: "",
      expires_in: 0,
      id_token: "",
      sid: "",
      add_info: {
        cool_down: "",
        cool_down_ending_date_time: "",
      },
    }),
  // getIdToken: () => null,
  createProfile: () => Promise.resolve({}),
  getProfile: () => Promise.resolve(),
  persistProfile: () => {},
  persistTokens: () => {},
  refreshToken: () =>
    Promise.resolve({
      access_token: "",
      refresh_token: "",
      token_type: "",
      expires_in: 0,
      id_token: "",
      sid: "",
      add_info: {
        cool_down: "",
        cool_down_ending_date_time: "",
      },
    }),
  // updateProfile: () => Promise.resolve({}),
  logout: () => Promise.resolve(),
  isRedirectAllowed: false,
  setIsRedirectAllowed: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [sid, setSid] = useState<string>("");
  const [profile, setProfile] = useState<Profile>();
  const [isRedirectAllowed, setIsRedirectAllowed] = useState<boolean>(false);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const profileData = localStorage.getItem(PROFILE_STORAGE_KEY);
    return Boolean(profileData);
  });

  useEffect(() => {
    const checkAuthorization = () => {
      const profileData = localStorage.getItem(PROFILE_STORAGE_KEY);
      setIsAuthorized(Boolean(profileData));
    };
    window.addEventListener("storage", checkAuthorization);
    return () => {
      window.removeEventListener("storage", checkAuthorization);
    };
  }, []);

  const signup = async (username: string) => {
    SIGNUP_PARAMS.append("username", username);
    try {
      const res = await instance.post<SignUpResponse>(
        GRIFFON_SIGNUP_URL,
        SIGNUP_PARAMS
      );
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
      setSid(res.data.sid);
      await sendOtp(CODE, res.data.sid);
      setIsRedirectAllowed(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        // toast.error("User already exists. Please, try with a different email.");
        console.error(
          "User already exists. Please, try with a different email."
        );
      }
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        // toast.error("Seems invalid email or phone format, try again");
        console.error("Seems invalid email or phone format, try again");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (isRedirectAllowed) {
      //   toast.success("Email verification passed!");
      console.log("Email verification passed!");
      router.push("/signup/password");
      setIsRedirectAllowed(false);
    }
  }, [isRedirectAllowed, router]);

  useEffect(() => {
    const profileInfoString = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (profileInfoString) {
      setProfile(JSON.parse(profileInfoString));
    }
  }, []);

  function register(sid: string, password: string) {
    return instance
      .post<RegisterResponse>(
        GRIFFON_REGISTER_URL,
        {
          password,
        },
        {
          params: {
            sid,
          },
        }
      )
      .then((res) => res.data);
  }

  async function createProfile(data: ProfileUpdateDTO) {
    return instance
      .post<Profile>(GRIFFON_PROFILE_URL, data)
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Something went wrong");
      });
  }

  async function getProfile() {
    return instance
      .get<Profile>(GRIFFON_PROFILE_URL)
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        throw new Error("There's no token id");
      });
  }

  const persistProfile = (profile: Profile) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  };
  const persistTokens = (tokens: AuthTokens) => {
    const expire_date = new Date().getTime() + tokens.expires_in * 1000;
    localStorage.setItem(
      TOKEN_STORAGE_KEY,
      JSON.stringify({
        ...tokens,
        expire_date,
      })
    );
  };
  const refreshToken = async () => {
    let url = BASE_GRIFFON_URL + GRIFFON_TOKEN_URL;
    const params = new URLSearchParams();
    params.append("client_id", GRIFFON_MY_CLIENT);
    params.append("client_secret", GRIFFON_MY_SECRET);
    const tokensString = localStorage.getItem(TOKEN_STORAGE_KEY);
    const tokens = tokensString ? JSON.parse(tokensString) : null;
    if (tokens) {
      params.append("refresh_token", tokens.refresh_token);
      params.append("grant_type", "refresh_token");
      return axios.post<AuthTokens>(url, params).then((res) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(res.data));
        return res.data;
      });
    } else {
      throw new Error("No tokens found in local storage");
    }
  };

  const getAccessToken = (): string | null => {
    let tokens: AuthTokens | null = null;
    try {
      const tokenString = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (tokenString) {
        tokens = JSON.parse(tokenString);
      }
    } catch (e) {
      console.error(e);
    }
    return tokens?.access_token ?? null;
  };

  const sendRestorePassword = (username: string) => {
    let url = BASE_GRIFFON_URL + GRIFFON_PASSWORD_RESET_URL;
    return axios
      .post<SignUpResponse>(url, {
        client_id: GRIFFON_MY_CLIENT,
        username,
      })
      .then((res) => res.data);
  };

  const verifyRestoreSecret = (code: string, sid?: string) => {
    let url = BASE_GRIFFON_URL + GRIFFON_RESET_VERIFY;
    return axios
      .post<SendOtpResponse>(
        url,
        {},
        {
          params: {
            sid,
            code,
          },
        }
      )
      .then((res) => res.data);
  };

  const setResetPassword = (sid: string, new_password: string) => {
    const url = BASE_GRIFFON_URL + GRIFFON_RESET_PASSWORD;
    return axios
      .put<ResetPasswordResponseDto>(
        url,
        { new_password },
        {
          params: {
            sid,
          },
        }
      )
      .then((res) => res.data);
  };

  const updateAvatar = (body: any) => {
    const url = BASE_GRIFFON_URL + GRIFFON_PROFILE_AVATAR;
    let accessToken = getAccessToken();
    return axios
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };

  const deleteAvatar = () => {
    const url = BASE_GRIFFON_URL + GRIFFON_PROFILE_AVATAR;
    let accessToken = getAccessToken();
    return axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
  };

  const logout = () => {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setIsAuthorized(false);
    // toast.success("You're logged off!");
  };

  return (
    <Auth.Provider
      value={{
        sid,
        setSid,
        signup,
        // sendOtp,
        // checkIfUserExists,
        register,
        // getIdToken,
        createProfile,
        getProfile,
        persistProfile,
        persistTokens,
        refreshToken,
        // updateProfile,
        profile,
        setProfile,
        isAuthorized,
        setIsAuthorized,
        logout,
        isRedirectAllowed,
        setIsRedirectAllowed,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
