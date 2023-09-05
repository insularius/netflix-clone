import { AuthTokens, Profile, RegisterResponse } from "@/app/types/griffon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";
import { ProfileUpdateDTO } from "../../types/griffon";
import {
  CODE,
  GRIFFON_PROFILE_URL,
  GRIFFON_REGISTER_URL,
  TOKEN_STORAGE_KEY,
} from "../../constants/constants";
import { sendOtp } from "@/app/types/authProvide";
import { signupService } from "@/app/services/signup";
import { signinService } from "@/app/services/signin";
export interface AuthState extends Profile {
  sid: string;
  profile?: Profile;
  isAuthorized: boolean;
  isRedirectAllowed: boolean;
  password: string;
  first_name: string;
  last_name: string;
  tokens?: AuthTokens;
  role?: "admin" | "user";
}

const initialState: AuthState = {
  sid: "",
  isAuthorized: false,
  isRedirectAllowed: false,
  password: "",
  first_name: "",
  last_name: "",
  tokens: undefined,
  role: "user",
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

export const signin = createAsyncThunk(
  "auth/signin",
  async (username: string, thunkAPI) => {
    try {
      const data = await signinService(username);
      // persist tokens to localstorage
      // переписать логику токенов
      // также требуется проверка на window
      // вытащить авторизацию из редакса, точнее токены, они не должны храниться там
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

//   const getIdToken = async (): Promise<string | null> => {
//     try {
//       const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
//       const tokens: AuthTokens = JSON.parse(storedTokens!);
//       return tokens.id_token ? tokens.id_token : null;
//     } catch (e) {
//       console.error(e);
//       return null;
//     } finally {
//       console.log(`Something`);
//     }
//     //const storedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
//     //return storedTokens ? JSON.parse(storedTokens).id_token : null;
//   };

//   async function createProfile(data: ProfileUpdateDTO) {
//     let url = BASE_GRIFFON_URL + GRIFFON_PROFILE_URL;
//     const idToken = await getIdToken();
//     return axios
//       .post<Profile>(url, data, {
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//         },
//       })
//       .then((res) => res.data);
//   }

//   async function getProfile() {
//     const idToken = await getIdToken();
//     let url = BASE_GRIFFON_URL + GRIFFON_PROFILE_URL;
//     if (idToken) {
//       return axios
//         .get(url, {
//           headers: {
//             Authorization: `Bearer ${idToken}`,
//           },
//         })
//         .then((res) => res?.data);
//     } else {
//       throw new Error("There's no token ID");
//     }
//   }

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
  async (data: ProfileUpdateDTO) => {
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

export const setAdminCode = createAsyncThunk(
  "auth/setAdminCode",
  async (code: string, thunkAPI) => {
    if (code === "1") {
      return "admin";
    } else {
      return thunkAPI.rejectWithValue("Invalid code");
    }
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
      state.profile = action.payload;
    },
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
    },
    resetState: (state) => {
      console.log("Handled");
      // state = initialState;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      state.isAuthorized = false;
      return initialState;
    },
    setRole(state, action: PayloadAction<"admin" | "user">) {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {})
      .addCase(signup.fulfilled, (state, action) => {
        state.sid = action.payload.sid;
        sendOtp(CODE, action.payload.sid);
        state.isRedirectAllowed = true;
      })
      .addCase(signup.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(register.fulfilled, (state, action) => {})
      .addCase(
        createProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.first_name = action.payload.first_name ?? state.first_name;
          state.last_name = action.payload.last_name ?? state.last_name;
        }
      )
      .addCase(signin.pending, (state) => {})
      .addCase(signin.fulfilled, (state, action) => {
        state.sid = action.payload.sid;
        state.isAuthorized = true;
        state.role = "user";
      })
      .addCase(setAdminCode.fulfilled, (state, action) => {
        state.role = "admin";
      })
      .addCase(setAdminCode.rejected, (state, action) => {
        state.role = "user";
        console.log("Invalid code");
        console.log("Error:", action.error);
      });
  },
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
  setRole,
} = authSlice.actions;

console.log(authSlice.reducer);
export default authSlice.reducer;
