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
} from "../../../redux/auth/auth";
import { RootState, store } from "@/app/redux/store/store";
import { Provider } from "react-redux";
import SignupFormPassword from "@/app/components/signupForms/signupFormPassword";
const SignupPage = () => {
  return <SignupFormPassword />;
};
export default SignupPage;
