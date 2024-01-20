import type { Metadata } from "next";
import "./globals.css";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html className="h-full">
    <body className="h-full">{children}</body>
  </html>
);

export default RootLayout;
