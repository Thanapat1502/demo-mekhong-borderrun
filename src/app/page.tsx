"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import { useEffect } from "react";
import { useContentStore } from "@/store/zustand/contentStore";
import { heroImages } from "@/data/images/heroImage";

// Dynamic imports for below-the-fold content
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const JourneySection = dynamic(
  () => import("@/components/home/JourneySection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const PickupPointsSection = dynamic(
  () => import("@/components/home/PickupPointsSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const TestimonialSection = dynamic(
  () => import("@/components/home/TestimonialSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const ContactSection = dynamic(
  () => import("@/components/home/ContactSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const CTASection = dynamic(() => import("@/components/home/CTASection"), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />,
});

export default function Home() {
  const {
    // fetchHeroImages,
    fetchJourneyImages,
    fetchGalleryImages,
    fetchPickupPointImages,
    // heroImages,
    journeyImages,
    galleryImages,
    pickupPointImages,
  } = useContentStore();

  // Fetch all data on page load
  useEffect(() => {
    // fetchHeroImages();
    fetchJourneyImages();
    fetchGalleryImages();
    fetchPickupPointImages();
  }, [
    // fetchHeroImages,
    fetchJourneyImages,
    fetchGalleryImages,
    fetchPickupPointImages,
  ]);

  return (
    <div className="bg-white">
      <HeroSection heroImages={heroImages} />
      <AboutSection />
      <JourneySection
        journeyImages={journeyImages}
        galleryImages={galleryImages}
      />
      <PickupPointsSection pickupPointImages={pickupPointImages} />
      <TestimonialSection />
      <ContactSection />
      <CTASection />
    </div>
  );
}
