import { ThemeProvider } from "@mui/material";
// import { Provider } from "react-redux";
import { AuthProvider } from "./context/auth";
import { CommentsProvider } from "./context/commentsContext";
import "./globals.css";
import ReduxProvider from "./redux/reduxProvider/reduxProvider";
import { theme } from "./theme/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <CommentsProvider>{children}</CommentsProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
