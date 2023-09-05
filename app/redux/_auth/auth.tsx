import { AuthTokens, Profile, RegisterResponse } from "@/app/types/griffon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";
import { ProfileUpdateDTO, SignUpResponse } from "../../types/griffon";
import {
  CODE,
  GRIFFON_PROFILE_URL,
  GRIFFON_REGISTER_URL,
  GRIFFON_SIGNUP_URL,
  PROFILE_STORAGE_KEY,
  SIGNUP_PARAMS,
} from "../../constants/constants";
import { sendOtp } from "@/app/types/authProvide";
import axios from "axios";
import { useEffect } from "react";
import { signupService } from "@/app/services/signup";
import testInstance from "../../services/axiosInstance";
import { save } from "redux-localstorage-simple";
export interface AuthState extends Profile {
  sid: string;
  profile?: Profile;
  isAuthorized: boolean;
  isRedirectAllowed: boolean;
  password: string;
  first_name: string;
  last_name: string;
  tokens?: AuthTokens;
}

const initialState: AuthState = {
  sid: "",
  isAuthorized: false,
  isRedirectAllowed: false,
  password: "",
  first_name: "",
  last_name: "",
  tokens: undefined,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (username: string, thunkAPI) => {
    try {
      const data = await signupService(username);
      return data;
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ sid, password }: { sid: string; password: string }) => {
    const res = await instance.post<RegisterResponse>(
      GRIFFON_REGISTER_URL,
      { password },
      { params: { sid } }
    );
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Unexpected response status: ${res.status}`);
    }

    return res.data;
  }
);

export const createProfile = createAsyncThunk(
  "auth/createProfile",
  async (data: ProfileUpdateDTO): Promise<Profile> => {
    const res = await instance.post<Profile>(GRIFFON_PROFILE_URL, data);
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
    return res.data;
  }
);

export const getProfile = createAsyncThunk("auth/getProfile", async () => {
  const res = await instance.get<Profile>(GRIFFON_PROFILE_URL);
  if (res.status !== 200) {
    throw new Error(`Unexpected response status: ${res.status}`);
  }
  return res.data;
});

export const persistProfile = createAsyncThunk(
  "auth/persistProfile",
  async (profile: Profile, { dispatch }) => {
    dispatch(setProfile(profile));
    return profile;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSid(state, action: PayloadAction<string>) {
      state.sid = action.payload;
    },
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    setIsRedirectAllowed(state, action: PayloadAction<boolean>) {
      state.isRedirectAllowed = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    resetRedirect: (state) => {
      state.isRedirectAllowed = false;
    },
    setProfileData(state, action: PayloadAction<Profile>) {
      Object.assign(state, action.payload);
    },
    setProfileToLocalStorage(state, action: PayloadAction<Profile>) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(action.payload));
    },
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
    },
    resetState: (state) => {
      return initialState;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(signup.pending, (state) => {})
  //     .addCase(signup.fulfilled, (state, action) => {
  //       state.sid = action.payload.sid;
  //       sendOtp(CODE, action.payload.sid);
  //       state.isRedirectAllowed = true;
  //     })
  //     .addCase(signup.rejected, (state, action) => {
  //       console.error(action.payload);
  //     })
  //     .addCase(register.fulfilled, (state, action) => {})
  //     .addCase(
  //       createProfile.fulfilled,
  //       (state, action: PayloadAction<Profile>) => {
  //         state.first_name = action.payload.first_name ?? state.first_name;
  //         state.last_name = action.payload.last_name ?? state.last_name;
  //       }
  //     );
  // },
});

export const {
  setSid,
  setProfile,
  setIsAuthorized,
  setIsRedirectAllowed,
  setPassword,
  resetRedirect,
  setProfileData,
  setProfileToLocalStorage,
  setTokens,
  resetState,
} = authSlice.actions;

// // export default authSlice.reducer;
