import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    default: "Industrial Jobs HQ - Industrial Sales Jobs & Careers",
    template: "%s | Industrial Jobs HQ",
  },
  description:
    "Find industrial sales jobs in manufacturing, automation, and industrial equipment. Browse opportunities from top companies across the United States.",
  keywords: [
    "industrial sales jobs",
    "manufacturing sales",
    "industrial equipment sales",
    "automation sales jobs",
    "B2B sales careers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {/* Use the component here instead of the raw script tags */}
      <GoogleAnalytics gaId="G-2FKDLWBQQR" />
    </html>
  );
}
