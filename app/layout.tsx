import { ThemeProvider } from "@mui/material";
import { AuthProvider } from "./context/auth";
import { CommentsProvider } from "./context/commentsContext";
import "./globals.css";
import ReduxProvider from "./redux/reduxProvider/reduxProvider";
import { theme } from "./theme/theme";

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html>
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
export async function generateStaticParams() {
  return ["kz", "en"].map((lng) => ({ lng }));
}
