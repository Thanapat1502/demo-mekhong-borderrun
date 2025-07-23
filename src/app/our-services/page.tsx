"use client";
import { useEffect } from "react";
import ServicesHero from "@/components/our-services/ServicesHero";
import MainService from "@/components/our-services/MainService";
import ServicesPickupPoints from "@/components/our-services/ServicesPickupPoints";
import WhatsIncluded from "@/components/our-services/WhatsIncluded";
import BookingInfo from "@/components/our-services/BookingInfo";
import ServicesCTA from "@/components/our-services/ServicesCTA";
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
      <ServicesCTA />
    </div>
  );
}
