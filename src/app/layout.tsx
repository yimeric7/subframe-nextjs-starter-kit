import FREDDataLayout from "../ui/layouts/FREDDataLayout";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FRED Data Analytics",
  description: "Explore and analyze Federal Reserve Economic Data with powerful visualization tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="h-full bg-white font-sans">
        <FREDDataLayout>{children}</FREDDataLayout>
      </body>
    </html>
  );
}
