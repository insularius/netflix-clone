"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";

export const TABLET_SIZE = 768;
export const TABLET_MEDIA_QUERY = `@media (max-width: ${TABLET_SIZE}px)`;

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
  currentTheme: typeof darkTheme;
}
type Props = {
  children: ReactNode;
  defaultTheme: string;
};
const defaultContext: IThemeContext = {
  isDark: false,
  toggleTheme: () => {},
  currentTheme: darkTheme,
};

export const ThemeContext = createContext<IThemeContext>(defaultContext);

export const ThemeWrapper: React.FC<Props> = ({ defaultTheme, children }) => {
  const [isDark, setIsDark] = useState(() => {
    const themeCookie = defaultTheme === "dark";
    return themeCookie ? true : false;
  });

  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";
    document.cookie = `theme=${newTheme}`;
    setIsDark(!isDark);
  };
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, currentTheme: theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
