"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Link,
  AppBar,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthorized,
  setIsRedirectAllowed,
  setPassword,
  getProfile,
  persistProfile,
  createProfile,
  setProfileData,
  setProfileToLocalStorage,
  setProfile,
} from "../../redux/_auth/auth";
import { AppDispatch, RootState, store } from "@/app/redux/store/store";
import { Provider } from "react-redux";
import {
  PROFILE_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from "@/app/constants/constants";
import { Profile } from "@/app/types/griffon";
const SignupFormProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { first_name, last_name } = useSelector(
    (state: RootState) => state.auth
  );

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProfileData({ first_name: e.target.value }));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProfileData({ last_name: e.target.value }));
  };

  const handleProfileInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createProfile({
        first_name: first_name,
        last_name: last_name,
      })
    );
    setIsAuthorized(true);
    const profileAction = await dispatch(getProfile());
    if (profileAction.type === getProfile.fulfilled.type) {
      const profileData = profileAction.payload;
      dispatch(setProfile(profileData as Profile));
      router.push("/signup/info");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={1}
        sx={{
          borderBottom: "1px grey",
          height: "90px",
          display: "flex",
          marginBottom: "40px",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt=""
                width={150}
                height={40}
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Box>
          <Link
            color="inherit"
            sx={{
              textTransform: "none",
              textDecoration: "none",
              fontFamily: "sans-serif",
              cursor: "pointer",
            }}
          >
            Sign In
          </Link>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            height: "300px",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle1">Step 2 of 3</Typography>
          <Typography variant="h4" sx={{ textAlign: "left", fontWeight: 600 }}>
            Welcome back!
          </Typography>
          <Typography variant="h4" sx={{ textAlign: "left", fontWeight: 600 }}>
            Joining Netflix is easy.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "20px" }}>
            Enter your first name and last name and you&apos;ll be watching in
            no time.
          </Typography>
          <Typography variant="body2">Email:</Typography>
          <Typography variant="body2">user@example.com</Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="Enter your First Name"
            type="text"
            sx={{ marginTop: "20px" }}
            onChange={handleFirstNameChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Enter your Last Name"
            type="text"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            onChange={handleLastNameChange}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleProfileInfoSubmit}
          >
            NEXT
          </Button>
        </Box>
      </Container>
      <Box sx={{ padding: 3, backgroundColor: "#f7f7f7" }}>
        <Typography variant="body2">
          Popular questions and answers here.
        </Typography>
      </Box>
    </Box>
  );
};
export default SignupFormProfile;
