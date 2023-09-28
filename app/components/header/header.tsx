"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Image from "next/image";
import styles from "../header/styles.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { resetRedirect, signup } from "../../redux/_auth/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import { validateEmail } from "@/app/types/authService";
import ChevronRightIcon from "../svg/chevronRightIcon";
import ErrorIcon from "../svg/errorSvg";
import { SignInButton, StartButton } from "../styledComponents/header/styled";
import LngIcon from "../svg/lngSvg";

const Header = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const languageMap = {
    en: "English",
    kz: "Qazaq",
  };
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  const isRedirectAllowed = useSelector(
    (state: RootState) => state.auth.isRedirectAllowed
  );

  useEffect(() => {
    if (isRedirectAllowed) {
      router.push("/signup/password");
      dispatch(resetRedirect());
    }
  }, [isRedirectAllowed, router, dispatch]);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    setEmailError(!validateEmail(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signup(email));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={styles.headerContainer}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="10px 0px"
        >
          <Image src="/images/logo.png" alt="" width={150} height={40} />

          <Box>
            <FormControl
              size="small"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Select
                labelId="language-select-label"
                id="language-select"
                name="language"
                defaultValue="en"
                className={styles.select}
                sx={{
                  color: "white",
                  font: "inherit",
                  "& .MuiSvgIcon-root": {
                    fill: "white",
                  },
                }}
                renderValue={(value) => (
                  <Box display="flex" alignItems="center">
                    <LngIcon />
                    <Box component="span" marginLeft="5px">
                      {(languageMap as { [key: string]: string })[value]}
                    </Box>
                  </Box>
                )}
              >
                <MenuItem value="en" onClick={() => changeLanguage("en")}>
                  English
                </MenuItem>
                <MenuItem value="kz" onClick={() => changeLanguage("kz")}>
                  Qazaq
                </MenuItem>
              </Select>
              <SignInButton
                sx={{
                  "&:hover": {
                    backgroundColor: "#b20303",
                  },
                }}
                className={styles.signInButton}
                href="/login"
              >
                Sign In
              </SignInButton>
            </FormControl>
          </Box>
        </Box>
        <Box className={styles.contentContainer}>
          <Typography
            variant="h1"
            // className={styles.heading}
            sx={{
              margin: "0",
              fontSize: "3rem",
              fontWeight: 700,
              maxWidth: "100%",
              color: "white",
            }}
          >
            {t("unlimited_movies")}
          </Typography>
          <Typography
            variant="body2"
            // className={styles.subheading}
            sx={{
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "white",
              marginTop: "16px",
            }}
          >
            {t("watch_anywhere")}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "white",
              marginTop: "16px",
            }}
            className={styles.subheading}
          >
            Ready to watch? Enter your email to create or restart your
            membership.
          </Typography>
          <FormControl
            sx={{
              width: "600px",
              display: "flex",
              flexDirection: "row",
              margin: "auto",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: "10px",
              }}
            >
              <TextField
                sx={{ border: "1px solid gray", marginLeft: "20px" }}
                className={styles.emailInput}
                label="Email address"
                name="email"
                type="email"
                id="filled-basic"
                variant="filled"
                InputLabelProps={{
                  style: {
                    color: "gray",
                  },
                }}
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
                value={email}
                error={emailError}
                onChange={handleEmailChange}
              />
              <Box
                sx={{
                  minHeight: "30px",
                  color: "red",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {emailError && (
                  <Box
                    sx={{
                      minHeight: "20px",
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "20px",
                    }}
                  >
                    <ErrorIcon />
                    <Box component="span" marginLeft="5px">
                      Email is required.
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <StartButton
              onClick={handleSubmit}
              type="submit"
              sx={{
                "&:hover": {
                  backgroundColor: "#b20303",
                },
              }}
            >
              Get Started
              <ChevronRightIcon />
            </StartButton>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
