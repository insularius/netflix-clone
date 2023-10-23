"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme();

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#db0001",
    },
    background: {
      default: "white",
    },
    text: {
      primary: "gray",
      secondary: "white",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0080ff",
    },
    background: {
      default: "black",
    },
    text: {
      primary: "gray",
      secondary: "white",
    },
  },
});
