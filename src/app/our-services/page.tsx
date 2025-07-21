import type { Metadata } from "next";
import ServicesHero from "@/components/our-services/ServicesHero";
import MainService from "@/components/our-services/MainService";
import ServicesPickupPoints from "@/components/our-services/ServicesPickupPoints";
import WhatsIncluded from "@/components/our-services/WhatsIncluded";
import BookingInfo from "@/components/our-services/BookingInfo";
import ServicesCTA from "@/components/our-services/ServicesCTA";

export const metadata: Metadata = {
  title: "Border Run Services - Professional Visa Extension Chiang Mai",
  description:
    "Professional border run services from Chiang Mai to Laos. Daily departures, multiple pickup points, licensed TAT operator. Complete visa extension service with comfortable transportation and expert guidance.",
  keywords: [
    "border run services",
    "visa extension Chiang Mai",
    "professional visa service",
    "Chiang Mai pickup points",
    "licensed border run",
    "visa renewal service",
    "Thailand Laos border",
    "daily visa service",
    "TAT licensed operator",
    "comfortable transportation",
    "expert visa guidance",
    "border crossing service",
  ],
  openGraph: {
    title: "Border Run Services - Professional Visa Extension Chiang Mai",
    description:
      "Professional border run services from Chiang Mai to Laos. Daily departures, multiple pickup points, licensed TAT operator.",
    url: "https://mekong-transfer.vercel.app/services",
    images: [
      {
        url: "/og-services-main.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Border Run Services - Chiang Mai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Border Run Services - Professional Visa Extension Chiang Mai",
    description:
      "Professional border run services from Chiang Mai to Laos. Daily departures, multiple pickup points.",
    images: ["/og-services-main.jpg"],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function Services() {
  return (
    <div className="bg-white min-h-screen">
      <ServicesHero />
      <MainService />
      <ServicesPickupPoints />
      <WhatsIncluded />
      <BookingInfo />
      <ServicesCTA />
    </div>
  );
}
