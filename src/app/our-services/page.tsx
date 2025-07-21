"use client";
import ServicesHero from "@/components/our-services/ServicesHero";
import MainService from "@/components/our-services/MainService";
import ServicesPickupPoints from "@/components/our-services/ServicesPickupPoints";
import WhatsIncluded from "@/components/our-services/WhatsIncluded";
import BookingInfo from "@/components/our-services/BookingInfo";
import ServicesCTA from "@/components/our-services/ServicesCTA";

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
