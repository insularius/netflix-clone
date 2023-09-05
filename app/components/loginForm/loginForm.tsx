"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Link,
  TextField,
  Checkbox,
} from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import {
  getProfile,
  setPassword,
  setSid,
  setIsAuthorized,
  setProfile,
  signin,
} from "@/app/redux/auth/auth";

import { useRouter } from "next/navigation";

import { Profile, RegisterResponse } from "@/app/types/griffon";
import {
  BASE_GRIFFON_URL,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
  TOKEN_STORAGE_KEY,
} from "@/app/constants/constants";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUserExists, setIsUserExist] = useState<boolean>(false);
  const [isUserNotFound, setIsUserNotFound] = useState<boolean>(false);
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const password = useSelector((state: RootState) => state.auth.password);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
    if (password && (password.length < 4 || password.length > 60)) {
      setPasswordError(
        "Your password must contain between 4 and 60 characters."
      );
    } else {
      setPasswordError("");
    }
  }, [email, password]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Password changed: ", event.target.value);
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
      await dispatch(signin(email));
      const res = await axios.post<RegisterResponse>(url, params);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
      dispatch(setSid(res.data.sid));
      router.push("/videos");
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        setIsWrongPassword(true);
        // toast.error("Wrong password");
        console.log("Wrong password!");
      }
      throw e;
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsUserNotFound(false);
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      console.log("Both email and password are required.");
      console.log(email, password);
      return;
    }
    try {
      const res = await signinPass(email, password);
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(res));
      dispatch(setIsAuthorized(true));
      const profileData = await dispatch(getProfile());
      dispatch(setProfile(profileData as Profile));
      console.log("U're logged in, have fun!");
      router.push("/videos");
    } catch (error) {
      console.error(error);
      console.log("Wrong password handle password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage:
          "url(https://images.frandroid.com/wp-content/uploads/2022/10/netflix-octobre-contenus-2022.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "start",
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ marginTop: "20px" }}
      >
        <Toolbar>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={40}
              style={{ marginLeft: "20px" }}
            />
          </Link>
          <Box flexGrow={1}></Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: 450,
            mx: "auto",
            backgroundColor: "rgba(0,0,0, 0.9)",
            minHeight: "660px",
          }}
        >
          <Box sx={{ padding: "60px 68px 40px 68px" }}>
            <h1 style={{ color: "#fff", margin: "0px" }}>Sign in</h1>
            <form
              style={{
                width: "100%",
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email or phone number"
                name="email"
                autoComplete="email"
                value={email}
                error={Boolean(emailError)}
                helperText={emailError}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                sx={{
                  background: "#333",
                  "& label": { color: "#8c8c8c" },
                  "& input": { color: "#8c8c8c" },
                }}
                InputLabelProps={{
                  style: {
                    color: "gray",
                  },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={Boolean(passwordError)}
                helperText={passwordError}
                value={password}
                onChange={handlePasswordChange}
                sx={{
                  background: "#333",
                  "& label": { color: "#8c8c8c" },
                  "& input": { color: "#8c8c8c" },
                }}
                autoComplete="current-password"
                InputLabelProps={{
                  style: {
                    color: "gray",
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#e50914",
                  "&:hover": { bgcolor: "#b5070c" },
                }}
                onClick={handlePasswordSubmit}
              >
                Sign In
              </Button>
            </form>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#8c8c8c",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "remember me checkbox" }}
                  sx={{
                    "& .MuiSvgIcon-root": { color: "#8c8c8c" },
                    marginLeft: "-3px",
                    padding: 0,
                  }}
                />
                <Typography variant="body2">Remember me</Typography>
              </Box>
              <Typography variant="body2">
                <Link
                  href={"/loginHelp"}
                  sx={{
                    textDecoration: "none",
                    color: "#8c8c8c",
                    cursor: "pointer",
                    "&:hover": {
                      borderBottom: "1px solid gray",
                    },
                  }}
                >
                  Need help?
                </Link>
              </Typography>
            </Box>
            <Box sx={{ marginTop: "100px", color: "#8c8c8c" }}>
              <Typography variant="body2">
                New to Netflix?
                <Link
                  style={{
                    color: "white",
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                  href={`/`}
                >
                  Sign up now
                </Link>
                .
              </Typography>
              <Typography variant="body2">
                This page is protected by Google reCAPTCHA to ensure youre not a
                bot. <Link style={{ cursor: "pointer" }}>Learn more</Link>.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          backgroundColor: "rgba(0,0,0, .75)",
          color: "#757575",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 450px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Questions? Contact us.</Typography>
          </Box>

          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Gift Cards</Typography>
            <Typography>Terms of Use</Typography>
            <Typography>Privacy Statement</Typography>
            <Typography>Privacy Statement</Typography>
          </Box>

          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Gift Cards</Typography>
            <Typography>Terms of Use</Typography>
            <Typography>Privacy Statement</Typography>
          </Box>

          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Gift Cards</Typography>
            <Typography>Terms of Use</Typography>
            <Typography>Privacy Statement</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
