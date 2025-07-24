"use client";
import { useEffect } from "react";
import ServicesHero from "@/components/our-services/ServicesHero";
import MainService from "@/components/our-services/MainService";
import ServicesPickupPoints from "@/components/our-services/ServicesPickupPoints";
import WhatsIncluded from "@/components/our-services/WhatsIncluded";
import BookingInfo from "@/components/our-services/BookingInfo";
import SharedCTASection from "@/components/shared/SharedCTASection";
import { useContentStore } from "@/store/zustand/contentStore";

export default function Services() {
  const { pickupPointImages, fetchPickupPointImages } = useContentStore();

  // Fetch pickup point data on page load
  useEffect(() => {
    fetchPickupPointImages();
  }, [fetchPickupPointImages]);

  return (
    <div className="bg-white min-h-screen">
      <ServicesHero />
      <MainService />
      <ServicesPickupPoints pickupPointImages={pickupPointImages} />
      <WhatsIncluded />
      <BookingInfo />
      <SharedCTASection
        subtitle="Contact us today to secure your spot on our next departure"
        primaryButtonText="Book Your Trip"
        backgroundColor="bg-primary-800">
        Ready to Book Your Border Run?
      </SharedCTASection>
    </div>
  );
}
