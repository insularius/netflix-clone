import { ThemeProvider } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import ReduxProvider from "../redux/reduxProvider/reduxProvider";
import { theme } from "../theme/theme";
import React from "react";
import "../globals.css";
import { ThemeWrapper } from "../theme/themeContext";
import { cookies } from "next/headers";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "kz" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  const cookieStore = cookies();

  return (
    <html lang={locale}>
      <body>
        <ReduxProvider>
          <ThemeWrapper
            defaultTheme={cookieStore.get("theme")?.value || "light"}
          >
            <ThemeProvider theme={theme}>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
