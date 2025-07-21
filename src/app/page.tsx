"use client";

import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import JourneySection from "@/components/home/JourneySection";
import PickupPointsSection from "@/components/home/PickupPointsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactSection from "@/components/home/ContactSection";
import CTASection from "@/components/home/CTASection";

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
