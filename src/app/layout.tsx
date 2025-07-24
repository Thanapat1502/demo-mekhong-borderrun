import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/base/FloatingContactButton";
import WebConfigProvider from "@/components/providers/WebConfigProvider";
import ContactProvider from "@/components/providers/ContactProvider";
import PerformanceOptimizer from "@/components/optimized/PerformanceOptimizer";

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
    "Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension. Licensed TAT operator offering an all-inclusive service at a reasonable price. Book your one-day trip today!",
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
  icons: {
    icon: { url: "/icon.png", type: "image/png" },
    shortcut: { url: "/favicon.ico", type: "image/x-icon" },
    // It's good practice to add an apple-icon.png to your /app directory for iOS devices
    apple: { url: "/apple-icon.png", type: "image/png" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mekong Border Run - Professional Visa Extension Service",
    description:
      "Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension with a licensed TAT operator. All-inclusive service at a reasonable price.",
    siteName: "Mekong Border Run",
    images: [
      {
        url: "/image/seo/seo.png",
        width: 1200,
        height: 630,
        alt: "Mekong Border Run - Professional Visa Extension Service from Chiang Mai to Laos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mekong Border Run - Professional Visa Extension Service",
    description:
      "Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension with licensed TAT operator.",
    images: ["/image/seo/seo.png"],
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
      <head>
        {/* Critical resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Preload critical images */}
        <link
          rel="preload"
          href="/image/home/other3.jpg"
          as="image"
          type="image/jpeg"
        />

        {/* Prefetch likely next pages */}
        <link rel="prefetch" href="/our-services" />
        <link rel="prefetch" href="/contact" />

        {/* Performance optimizations */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* Resource hints for Supabase */}
        <link rel="dns-prefetch" href="//supabase.co" />
        <link rel="preconnect" href="https://supabase.co" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AuthProvider>
            <WebConfigProvider>
              <ContactProvider>
                <PerformanceOptimizer>
                  <Navigation />
                  <main className="min-h-screen">{children}</main>
                  <Footer />
                  <FloatingContactButton />
                </PerformanceOptimizer>
              </ContactProvider>
            </WebConfigProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
