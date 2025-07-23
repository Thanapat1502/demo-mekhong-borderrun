"use client";

import PickupPointsModal from "@/components/base/PickupPointsModal";

interface PickupPointImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  description: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ServicesPickupPointsProps {
  pickupPointImages?: PickupPointImage[];
}

export default function ServicesPickupPoints({
  pickupPointImages = [],
}: ServicesPickupPointsProps) {
  return (
    <PickupPointsModal
      title="Pickup Points"
      subtitle="Convenient locations throughout Chiang Mai for your pickup"
      className="bg-neutral-50"
      pickupPointImages={pickupPointImages}
    />
  );
}
