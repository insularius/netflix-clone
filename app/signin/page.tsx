"use client";
import React, { useState } from "react";

import {
  BASE_GRIFFON_URL,
  CODE,
  DASHBOARD_PAGE,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
  TOKEN_STORAGE_KEY,
} from "../constants/constants";
import axios from "axios";
import { Profile, RegisterResponse, SignUpResponse } from "../types/griffon";
import { checkIfUserExists } from "../types/authProvide";
import {
  setIsAuthorized,
  setPassword,
  getProfile,
  persistProfile,
  setSid,
  setTokens,
} from "../redux/auth/auth";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/auth/auth";
import styles from "../signin/page.module.css";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [isUserExists, setIsUserExist] = useState<boolean>(false);
  const [isUserNotFound, setIsUserNotFound] = useState<boolean>(false);
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const password = useSelector((state: RootState) => state.auth.password);
  const sid = useSelector((state: RootState) => state.auth.sid);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsUserNotFound(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
    setIsWrongPassword(false);
  };
  const signinPass = async (
    username: string,
    password: string
  ): Promise<RegisterResponse> => {
    let url = BASE_GRIFFON_URL + "/oauth/token";
    const params = new URLSearchParams();
    params.append("client_id", GRIFFON_MY_CLIENT);
    params.append("client_secret", GRIFFON_MY_SECRET);
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    try {
      const res = await axios.post<RegisterResponse>(url, params);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
      setSid(res.data.sid);
      router.push("/videos");
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        setIsWrongPassword(true);
        console.log("Wrong password!");
      }
      throw e;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signin(email));
      setIsUserExist(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await signinPass(email, password);
      const tokens = res;
      console.log(tokens);
      dispatch(setTokens(tokens));
      const profileData = await dispatch(getProfile());
      dispatch(persistProfile(profileData as Profile));
      console.log("U're logged in, have fun!");
      router.push("/videos");
    } catch (error) {
      console.error(error);
      console.log("Wrong password handle password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerForm} style={{ marginBottom: "0px" }}>
        <div className={styles.info}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="/images/TLOU.png" alt="" />
          </div>
          <h2 style={{ marginTop: "0px" }}>Log in</h2>
          <p>Use your Email or Phone to get access your cabinet</p>
        </div>
        <form className={styles.form}>
          <input
            className={`${styles.input} ${isUserNotFound ? styles.error : ""}`}
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={"Enter email or phone"}
          />
          {isUserExists && (
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              className={`${styles.input} ${
                isWrongPassword ? styles.error : ""
              }`}
            />
          )}
          {isUserExists ? (
            <button
              className={styles.button}
              type="submit"
              onClick={handlePasswordSubmit}
            >
              Continue
            </button>
          ) : (
            <button
              className={styles.button}
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </button>
          )}
        </form>

        <div className={styles.signup}>
          <p>Dont have an account?</p>
          <p>asassaAs_1</p>
          <a href="/signup">Sign up now!</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
// export { LoginPage };
//asassaAs_1
// addds@gmail.com
