"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
// import makeStyles from "@mui/styles";
import Image from "next/image";
import styles from "../header/styles.module.css";
import { useAuth } from "@/app/context/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { resetRedirect, signup } from "../../redux/_auth/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const StyledButton = styled(Button)`
  width: 210px;
  height: 56px;
  border: 0;
  outline: 0;
  background: #db0001;
  color: #fff;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
`;
const SignInButton = styled(Button)`
  width: 76px;
  height: 32px;
  border: 0;
  outline: 0;
  background: #db0001;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
`;
const Header = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const languageMap = {
    en: "English",
    kz: "Qazaq",
  };
  useEffect(() => {
    console.log(window?.innerWidth, window?.innerHeight);
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Globe"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 14.5C8.23033 14.5 8.84266 14.2743 9.48679 12.986C9.76293 12.4337 9.99973 11.7621 10.1748 11H5.8252C6.00027 11.7621 6.23707 12.4337 6.51321 12.986C7.15734 14.2743 7.76967 14.5 8 14.5ZM5.57762 9.5C5.52716 9.02077 5.5 8.51911 5.5 8C5.5 7.48089 5.52716 6.97923 5.57762 6.5H10.4224C10.4728 6.97923 10.5 7.48089 10.5 8C10.5 8.51911 10.4728 9.02077 10.4224 9.5H5.57762ZM11.7092 11C11.4822 12.1217 11.1317 13.117 10.6914 13.9184C12.0137 13.3161 13.0987 12.2837 13.7678 11H11.7092ZM14.3261 9.5H11.9298C11.9759 9.01412 12 8.51269 12 8C12 7.48731 11.9759 6.98588 11.9298 6.5H14.3261C14.4398 6.98152 14.5 7.48373 14.5 8C14.5 8.51627 14.4398 9.01848 14.3261 9.5ZM4.0702 9.5H1.67393C1.56019 9.01848 1.5 8.51627 1.5 8C1.5 7.48373 1.56019 6.98152 1.67393 6.5H4.0702C4.02411 6.98588 4 7.48731 4 8C4 8.51269 4.02411 9.01412 4.0702 9.5ZM2.23221 11H4.29076C4.51779 12.1217 4.86832 13.117 5.30864 13.9184C3.98635 13.3161 2.90128 12.2837 2.23221 11ZM5.8252 5H10.1748C9.99973 4.23793 9.76293 3.56626 9.48679 3.01397C8.84266 1.72571 8.23033 1.5 8 1.5C7.76967 1.5 7.15734 1.72571 6.51321 3.01397C6.23707 3.56626 6.00027 4.23793 5.8252 5ZM11.7092 5H13.7678C13.0987 3.71627 12.0137 2.68389 10.6914 2.08162C11.1317 2.88302 11.4822 3.8783 11.7092 5ZM5.30864 2.08162C4.86832 2.88302 4.51779 3.8783 4.29076 5H2.23221C2.90128 3.71628 3.98635 2.68389 5.30864 2.08162ZM8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <Box component="span" marginLeft="5px">
                      {(languageMap as { [key: string]: string })[value]}
                    </Box>
                  </Box>
                )}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="kz">Qazaq</MenuItem>
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
            Unlimited movies, TV shows, and more
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
            Watch anywhere. Cancel anytime.
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
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <Box component="span" marginLeft="5px">
                      Email is required.
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <StyledButton
              onClick={handleSubmit}
              type="submit"
              sx={{
                "&:hover": {
                  backgroundColor: "#b20303",
                },
              }}
            >
              Get Started
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-mirrorinrtl="true"
                className="default-ltr-cache-0 e1mhci4z1"
                data-name="ChevronRight"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </StyledButton>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
