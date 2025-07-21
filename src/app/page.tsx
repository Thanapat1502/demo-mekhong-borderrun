import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import JourneySection from "@/components/home/JourneySection";
import PickupPointsSection from "@/components/home/PickupPointsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactSection from "@/components/home/ContactSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Professional Border Run Service - Chiang Mai to Laos Visa Extension",
  description:
    "Daily border run service from Chiang Mai to Huay Xai, Laos for visa extension. Licensed TAT operator offering comfortable, professional service at 4,100 THB. Includes White Temple visit and pickup from multiple locations.",
  keywords: [
    "border run Chiang Mai",
    "visa extension Thailand",
    "Laos border crossing",
    "Huay Xai visa run",
    "Thailand visa renewal",
    "Chiang Mai to Laos",
    "daily border run service",
    "TAT licensed operator",
    "White Temple tour",
    "visa extension service",
  ],
  openGraph: {
    title: "Professional Border Run Service - Chiang Mai to Laos",
    description:
      "Daily border run service from Chiang Mai to Huay Xai, Laos for visa extension. Licensed TAT operator with comfortable service.",
    url: "https://mekong-transfer.vercel.app",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Mekong Border Run Service - Chiang Mai to Laos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Border Run Service - Chiang Mai to Laos",
    description:
      "Daily border run service from Chiang Mai to Huay Xai, Laos for visa extension. Licensed TAT operator.",
    images: ["/og-home.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <PickupPointsSection />
      <TestimonialSection />
      <ContactSection />
      <CTASection />
    </div>
  );
}
