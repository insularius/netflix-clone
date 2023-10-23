// import { ThemeProvider } from "@mui/material";
// import { CommentsProvider } from "./context/commentsContext";
// import "./globals.css";
// import ReduxProvider from "./redux/reduxProvider/reduxProvider";
// import { theme } from "./theme/theme";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html>
//       <body>

//       </body>
//     </html>
//   );
// }

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
