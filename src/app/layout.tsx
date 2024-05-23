import { Toaster } from "react-hot-toast";

import { Inter } from "next/font/google";

import "./utils/globals.css";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Image BlurHash Previewer",
  description:
    "Next.js Image BlurHash Previewer is a utility tool designed to generate blur placeholders encoded in Base64 format, that could directly be used in Next.js Image `blurDataURL` prop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex justify-center min-h-screen text-gray-900 m-5 lg:m-12`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
