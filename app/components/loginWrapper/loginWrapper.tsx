"use client";
import React from "react";
import { AppBar, Toolbar, Box, Typography, Link } from "@mui/material";
import Image from "next/image";

import SignInForm from "../signInForm/signInForm";
import { useTheme } from "@/app/theme/themeContext";

const LoginWrapper = () => {
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
            <SignInForm />
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

export default LoginWrapper;
//asassaAs_1
// sdsadasd@gmail.com
// addds@gmail.com
