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
} from "../../redux/auth/auth";
import { RootState, store } from "@/app/redux/store/store";
import { Provider } from "react-redux";
import SignupFormPassword from "@/app/components/signupForms/signupFormPassword";
const SignupPage = () => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const sid = useSelector((state: RootState) => state.auth.sid);
  // const profile = useSelector((state: RootState) => state.auth.profile);
  // const password = useSelector((state: RootState) => state.auth.password);
  // const isAuthorized = useSelector(
  //   (state: RootState) => state.auth.isAuthorized
  // );
  // const isRedirectAllowed = useSelector(
  //   (state: RootState) => state.auth.isRedirectAllowed
  // );

  // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setPassword(event.target.value));
  // };

  // const [password1, setPassword1] = useState<string>("");
  // const [password2, setPassword2] = useState<string>("");
  // const { sid, setSid } = useAuth();
  // const { register } = useAuth();

  // const handlePasswordChange1 = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setPassword1(event.target.value);
  // };

  // const handlePasswordChange2 = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setPassword2(event.target.value);
  // };

  // const handlePasswordSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const registerResponse = await register(sid, password1);
  //     localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(registerResponse));
  //     // toast.success("Register success!");
  //     navigate(PROFILE_PAGE);
  //   } catch (error) {
  //     // toast.error("Register error!");
  //   }
  // };

  // useEffect(() => {
  //   const handleSignup = () => {
  //     router.push("/dashboard");
  //   };
  //   handleSignup();
  // }, [router]);

  // const handleSignup = () => {
  //   router.push("/dashboard");
  // };

  return (
    <SignupFormPassword />

    //   <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    //     <AppBar
    //       position="static"
    //       color="transparent"
    //       elevation={1}
    //       sx={{
    //         borderBottom: "1px grey",
    //         height: "90px",
    //         display: "flex",
    //         marginBottom: "40px",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Toolbar>
    //         <Box sx={{ flexGrow: 1 }}>
    //           <Link href="/">
    //             <Image
    //               src="/images/logo.png"
    //               alt=""
    //               width={150}
    //               height={40}
    //               style={{ cursor: "pointer" }}
    //             />
    //           </Link>
    //         </Box>
    //         <Link
    //           color="inherit"
    //           sx={{
    //             textTransform: "none",
    //             textDecoration: "none",
    //             fontFamily: "sans-serif",
    //             cursor: "pointer",
    //           }}
    //         >
    //           Sign In
    //         </Link>
    //       </Toolbar>
    //     </AppBar>
    //     <Container
    //       component="main"
    //       maxWidth="xs"
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         // justifyContent: "center",
    //         flexGrow: 1,
    //         height: "100%",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           width: "400px",
    //           height: "300px",
    //           justifyContent: "space-between",
    //           alignItems: "start",
    //         }}
    //       >
    //         <Typography variant="subtitle1">Step 1 of 3</Typography>
    //         <Typography
    //           variant="h4"
    //           sx={{ textAlign: "left", fontWeight: 600 }}
    //         >
    //           Welcome back!
    //         </Typography>
    //         <Typography
    //           variant="h4"
    //           sx={{ textAlign: "left", fontWeight: 600 }}
    //         >
    //           Joining Netflix is easy.
    //         </Typography>
    //         <Typography variant="body1" sx={{ marginBottom: "20px" }}>
    //           Enter your password and you&apos;ll be watching in no time.
    //         </Typography>
    //         <Typography variant="body2">Email:</Typography>
    //         <Typography variant="body2">user@example.com</Typography>
    //         <TextField
    //           variant="outlined"
    //           fullWidth
    //           label="Enter your password"
    //           type="password"
    //           sx={{ marginTop: "20px" }}
    //           onChange={handlePasswordChange}
    //         />
    //         <Link
    //           href="#"
    //           variant="body2"
    //           color="primary"
    //           underline="none"
    //           sx={{ margin: "20px 0px" }}
    //         >
    //           Forgot your password?
    //         </Link>
    //         <Button variant="contained" fullWidth>
    //           NEXT
    //         </Button>
    //       </Box>
    //     </Container>
    //     <Box sx={{ padding: 3, backgroundColor: "#f7f7f7" }}>
    //       <Typography variant="body2">
    //         Popular questions and answers here.
    //       </Typography>
    //     </Box>
    //   </Box>
  );
};
export default SignupPage;
