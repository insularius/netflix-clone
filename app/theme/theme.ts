"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 600, // tablet
      md: 900, // laptop
      lg: 1200, // desktop
      xl: 1536, // larger desktop
    },
  },
});

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
