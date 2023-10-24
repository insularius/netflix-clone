"use client";

import { createTheme } from "@mui/material";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 900,
      desktop: 1200,
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
