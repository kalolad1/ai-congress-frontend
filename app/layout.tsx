import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App Title",
  description: "My app description",
};

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
