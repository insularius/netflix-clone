"use client";
import React, { useEffect, useState, FC } from "react";
import {
  Box,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import styles from "../header/styles.module.scss";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { resetRedirect, signup } from "../../redux/_auth/auth";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { validateEmail } from "@/app/types/authService";
import ChevronRightIcon from "../svg/chevronRightIcon";
import ErrorIcon from "../svg/errorSvg";
import { SignInButton, StartButton } from "../styledComponents/header/styled";
import { useRouter } from "next-intl/client";
import LanguageSelector from "../languageSelector/languageSelector";
import { useTheme } from "@/app/theme/themeContext";
import ToggleThemeButton from "../styledComponents/header/themeSwitcher";
type Props = {
  locale: string;
};

const Header: FC<Props> = ({ locale }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const router = useRouter();
  const { currentTheme } = useTheme();
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
    <>
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
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <LanguageSelector locale={locale} />
                <SignInButton
                  sx={{
                    "&:hover": {
                      backgroundColor: currentTheme.palette.primary.dark,
                    },
                    backgroundColor: currentTheme.palette.primary.main,
                  }}
                  // className={styles.signInButton}
                  href="/login"
                >
                  {t("header.signin")}
                </SignInButton>
                <ToggleThemeButton />
              </FormControl>
            </Box>
          </Box>
          <Box className={styles.contentContainer}>
            <Typography
              variant="h1"
              sx={{
                margin: "0",
                fontSize: "3rem",
                fontWeight: 700,
                maxWidth: "100%",
                color: "white",
              }}
            >
              {t("header.title")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "white",
                marginTop: "16px",
              }}
            >
              {t("header.subtitle1")}
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
              {t("header.subtitle2")}
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
                  sx={{
                    border: "1px solid gray",
                    marginLeft: "20px",
                    "& label": {
                      color: "gray",
                    },
                    "& input": { color: currentTheme.palette.text.secondary },
                  }}
                  className={styles.emailInput}
                  label={t("header.email")}
                  name="email"
                  type="email"
                  id="filled-basic"
                  variant="filled"
                  InputLabelProps={{
                    style: {
                      color: "gray",
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
                    backgroundColor: currentTheme.palette.primary.dark,
                  },
                  backgroundColor: currentTheme.palette.primary.main,
                }}
              >
                {t("header.startButton")}
                <ChevronRightIcon />
              </StartButton>
            </FormControl>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
