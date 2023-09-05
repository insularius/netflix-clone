"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Paper,
  Typography,
  Link,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import Flag from "react-flagkit";
const HelpForm = () => {
  const [resetMethod, setResetMethod] = useState("email");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+7");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage:
          "url(https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg)",
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
          <Link
            href="/signup/password"
            sx={{
              color: "red",
              fontFamily: "sans-serif",

              textDecoration: "none",
              textTransform: "none",
              marginRight: "20px",
            }}
            fontSize={19}
          >
            Sign in
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          marginTop: "40px",
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: 460,
            height: "auto",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Paper elevation={3} sx={{ p: 4, background: "#f3f3f3" }}>
            {/* Здесь ваша форма */}
            <Typography variant="h4">Forgot Email/Password</Typography>
            <Typography variant="body1" mb={1} sx={{ marginTop: "20px" }}>
              How would you like to reset your password?
            </Typography>
            <RadioGroup
              name="resetMethod"
              // value={}
              onChange={(e) => setResetMethod(e.target.value)}
              sx={{ marginLeft: "30px" }}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email address"
              />
              <FormControlLabel
                value="sms"
                control={<Radio />}
                label="Text message (SMS)"
              />
            </RadioGroup>
            {resetMethod === "email" && (
              <>
                <Typography variant="body1" mb={1}>
                  We will send you an email with instructions on how to reset
                  your password.
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="name@example.com"
                  type="text"
                  placeholder="Enter your email"
                />
              </>
            )}
            {resetMethod === "sms" && (
              <>
                <Typography variant="body1" mb={1}>
                  We will text you a verification code to reset your password.
                  Message and data rates may apply.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    sx={{
                      width: "30%",
                      marginRight: "0px",
                    }}
                  >
                    <MenuItem value="+1">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <Flag country="US" />
                        <span>+1</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="+7">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 3 }}
                      >
                        <Flag country="KZ" />
                        <span>+7</span>
                      </Box>
                    </MenuItem>
                  </Select>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Phone number"
                    type="text"
                    placeholder="Enter your phone number"
                    sx={{
                      flex: 1,
                    }}
                  />
                </Box>
              </>
            )}
            <Box component="form" autoComplete="off">
              <Button
                variant="contained"
                fullWidth
                sx={{ width: "100%", marginTop: "30px", marginBottom: "20px" }}
              >
                {resetMethod === "email" ? "Email Me" : "Text Me"}
              </Button>
              <Link
                href="#"
                variant="body2"
                color="primary"
                underline="none"
                sx={{ fontSize: "16px" }}
              >
                I dont&apos;t remember my phone or email.
              </Link>
            </Box>
          </Paper>
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

export default HelpForm;
