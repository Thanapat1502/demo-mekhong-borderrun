"use client";

import ServicesHero from "@/components/services/ServicesHero";
import MainService from "@/components/services/MainService";
import ServicesPickupPoints from "@/components/services/ServicesPickupPoints";
import WhatsIncluded from "@/components/services/WhatsIncluded";
import BookingInfo from "@/components/services/BookingInfo";
import ServicesCTA from "@/components/services/ServicesCTA";

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
