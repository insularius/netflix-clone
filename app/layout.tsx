import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./context/auth";
import { CommentsProvider } from "./context/commentsContext";
import "./globals.css";
import { theme } from "./theme/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CommentsProvider>{children}</CommentsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
