'use client'

import type { Metadata } from "next";
import "@/app/globals.css";
import { CssBaseline, ThemeProvider as MuiThemeProvider, ThemeProvider } from "@mui/material";
import theme from "@/assets/theme/theme";

// export const metadata: Metadata = {
//   title: "InFrame",
//   description: "InFrame is a record attendance system",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
