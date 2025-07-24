"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  useDisclosure,
} from "@heroui/react";
import { useState, useEffect } from "react";
// import { useContentStore } from "@/store/zustand/contentStore";
import Image from "next/image";
interface PickupPointImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  description: string;
  google_map_url?: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface PickupPointsModalProps {
  title?: string;
  subtitle?: string;
  className?: string;
  pickupPointImages?: PickupPointImage[];
}

export default function PickupPointsModal({
  title = "Pickup Points",
  subtitle = "Convenient locations throughout Chiang Mai for your pickup",
  className = "",
  pickupPointImages = [],
}: PickupPointsModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Use props data or fallback to store data
  const pickupPoints = pickupPointImages;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const handleImageClick = (pickupPoint: PickupPointImage) => {
    // If Google Map URL is available, open it in a new tab
    if (pickupPoint.google_map_url) {
      window.open(pickupPoint.google_map_url, "_blank");
    } else {
      // Fallback: show image modal if no Google Map URL
      setSelectedImage(pickupPoint.src);
      onOpen();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("pickup-points-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pickup-points-section" className={`py-12 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-light text-black mb-6">{title}</h2>
          <p className="text-lg text-black">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isVisible
            ? // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="shadow-lg">
                  <div className="aspect-video bg-gray-200 animate-pulse" />
                  <CardBody className="p-4 text-center">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  </CardBody>
                </Card>
              ))
            : pickupPoints.map((point) => (
                <Card
                  key={point.id}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  isPressable
                  onPress={() => handleImageClick(point)}>
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={point.src}
                      alt={point.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      quality={80}
                    />
                  </div>
                  <CardBody className="p-4 text-center">
                    <h3 className="font-medium text-black mb-2">
                      {point.title}
                    </h3>
                    <p className="text-base text-black">{point.description}</p>
                    <p className="text-base text-gray-600 mt-1">
                      {point.location}
                    </p>
                  </CardBody>
                </Card>
              ))}
        </div>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="2xl"
          classNames={{
            backdrop: "bg-black/80",
            base: "border-none",
            header: "border-b-[1px] border-[#292f46]",
            body: "py-6",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl font-medium">Pickup Location</h3>
            </ModalHeader>
            <ModalBody>
              <div className="w-full relative aspect-video">
                <Image
                  src={selectedImage}
                  alt="Pickup location"
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover rounded-lg"
                  quality={90}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
