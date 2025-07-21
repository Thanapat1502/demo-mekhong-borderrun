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

const siteUrl = process.env.SITE_URL;

if (!siteUrl) {
  throw new Error("Missing environment variable: SITE_URL");
}

export const metadata: Metadata = {
  title: {
    default:
      "Mekong Border Run - Professional Visa Extension Service Chiang Mai to Laos",
    template: "%s | Mekong Border Run",
  },
  description:
    "Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension. Licensed TAT operator with 4,100 THB all-inclusive service. Book your one-day trip today!",
  keywords: [
    "border run",
    "visa extension",
    "Chiang Mai",
    "Laos",
    "Huay Xai",
    "Thailand visa",
    "visa run service",
    "Chiang Rai",
    "White Temple",
    "TAT licensed",
    "daily departure",
    "round trip",
    "border crossing",
    "visa renewal",
    "tourist visa",
    "immigration service",
  ],
  authors: [{ name: "Mekong Border Run", url: siteUrl }],
  creator: "Mekong Border Run",
  publisher: "Mekong Border Run",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mekong Border Run - Professional Visa Extension Service",
    description:
      "Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension with licensed TAT operator. 4,100 THB all-inclusive service.",
    siteName: "Mekong Border Run",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mekong Border Run - Visa Extension Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mekong Border Run - Professional Visa Extension Service",
    description:
      "Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension with licensed TAT operator.",
    images: ["/og-image.jpg"],
    creator: "@mekongborderrun",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "travel",
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
