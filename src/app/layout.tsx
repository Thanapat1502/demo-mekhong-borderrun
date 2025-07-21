import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mekong Border Run - Visa Extension Service Chiang Mai to Laos",
    template: "%s | Mekong Border Run",
  },
  description:
    "Professional border run service from Chiang Mai to Huay Xai, Laos. One-day trip for visa extension. Licensed TAT operator.",
  keywords: [
    "border run",
    "extend visa",
    "Chiang Mai",
    "Laos",
    "visa extension",
    "Thailand",
    "Huay Xai",
    "round trip",
  ],
  authors: [{ name: "Mekong Border Run" }],
  creator: "Mekong Border Run",
  metadataBase: new URL("https://mekong-transfer.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mekong-transfer.vercel.app",
    title: "Mekong Border Run - Visa Extension Service",
    description:
      "Professional border run service from Chiang Mai to Huay Xai, Laos",
    siteName: "Mekong Border Run",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mekong Border Run - Visa Extension Service",
    description:
      "Professional border run service from Chiang Mai to Huay Xai, Laos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
