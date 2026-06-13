import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youssef Elgourari | Full Stack Developer",
  description:
    "Portfolio of Youssef Elgourari, a full stack developer building modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
