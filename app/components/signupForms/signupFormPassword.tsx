"use client";
import React, { useEffect } from "react";
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
  setProfile,
  setIsAuthorized,
  setIsRedirectAllowed,
  setPassword,
  register,
  setTokens,
} from "../../redux/_auth/auth";
import { AppDispatch, RootState, store } from "@/app/redux/store/store";
import { Provider } from "react-redux";
import { TOKEN_STORAGE_KEY } from "@/app/constants/constants";
import { Root } from "postcss";
import { AuthTokens } from "@/app/types/griffon";
const SignupFormPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const password = useSelector((state: RootState) => state.auth.password);
  const sid = useSelector((state: RootState) => state.auth.sid);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event.target.value));
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const action = await dispatch(register({ sid, password }));
    if (action.type === register.fulfilled.type) {
      const tokens = action.payload;
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
      router.push("/signup/profile");
    } else {
      console.error(action);
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
            alignItems: "start",
          }}
        >
          <Typography variant="subtitle1">Step 1 of 3</Typography>
          <Typography variant="h4" sx={{ textAlign: "left", fontWeight: 600 }}>
            Welcome back!
          </Typography>
          <Typography variant="h4" sx={{ textAlign: "left", fontWeight: 600 }}>
            Joining Netflix is easy.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "20px" }}>
            Enter your password and you&apos;ll be watching in no time.
          </Typography>
          <Typography variant="body2">Email:</Typography>
          <Typography variant="body2">user@example.com</Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="Enter your password"
            type="password"
            sx={{ marginTop: "20px" }}
            onChange={handlePasswordChange}
          />

          <Link
            href="/loginHelp"
            variant="body2"
            color="primary"
            underline="none"
            sx={{ margin: "20px 0px" }}
          >
            Forgot your password?
          </Link>
          <Button variant="contained" fullWidth onClick={handlePasswordSubmit}>
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
export default SignupFormPassword;
