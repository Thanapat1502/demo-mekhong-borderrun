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
import { useState } from "react";

interface PickupPoint {
  name: string;
  image: string;
  desc: string;
}

interface PickupPointsModalProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const pickupPoints: PickupPoint[] = [
  {
    name: "Tha Pae Gate",
    image: "/image/home/pickup/thapae.jpg",
    desc: "Historic city gate area",
  },
  {
    name: "Chiang Mai Gate",
    image: "/image/home/pickup/chiangmai.jpg",
    desc: "South gate entrance",
  },
  {
    name: "Central Festival",
    image: "/image/home/pickup/central.jpg",
    desc: "Shopping center",
  },
  {
    name: "MAYA Lifestyle",
    image: "/image/home/pickup/maya.jpg",
    desc: "Nimman shopping mall",
  },
  {
    name: "Airport Area",
    image: "/image/home/pickup/airport.jpg",
    desc: "Hotels near airport",
  },
  {
    name: "Old City",
    image: "/image/home/pickup/oldcity.jpg",
    desc: "Historic center",
  },
];

export default function PickupPointsModal({
  title = "Pickup Points",
  subtitle = "Convenient locations throughout Chiang Mai for your pickup",
  className = "",
}: PickupPointsModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <section className={`py-24 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-black mb-6">{title}</h2>
          <p className="text-lg text-black">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pickupPoints.map((point, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              isPressable
              onPress={() => handleImageClick(point.image)}>
              <div className="aspect-video overflow-hidden">
                <img
                  src={point.image}
                  alt={point.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "/image/home/pickup/default.jpg";
                  }}
                />
              </div>
              <CardBody className="p-4 text-center">
                <h3 className="font-medium text-black mb-2">{point.name}</h3>
                <p className="text-sm text-black">{point.desc}</p>
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
              <div className="w-full">
                <img
                  src={selectedImage}
                  alt="Pickup location"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/image/home/pickup/default.jpg";
                  }}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
