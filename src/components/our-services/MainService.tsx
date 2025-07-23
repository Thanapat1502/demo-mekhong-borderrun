"use client";

import { useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import NextLink from "next/link";
import {
  FiTruck,
  FiUser,
  FiArrowRight,
  FiMapPin,
  FiCoffee,
} from "react-icons/fi";
import { usePackageStore } from "@/store/zustand/packageStore";

export default function MainService() {
  const { packages, fetchPackages, isLoading } = usePackageStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Get the main border run package (first one or find by name)
  const mainPackage =
    packages.find(
      (pkg) =>
        pkg.name.toLowerCase().includes("border") ||
        pkg.name.toLowerCase().includes("complete")
    ) || packages[0];

  if (isLoading) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-4xl font-light text-black mb-8">
              Border Run Service
            </h2>
            <p className="text-lg text-black leading-relaxed mb-8">
              Our comprehensive one-day border run service takes you from Chiang
              Mai to the Huay Xai border crossing in Laos. Perfect for visa
              extensions and tourist visa runs.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <FiTruck className="text-accent-500" size={20} />
                <span className="text-black">
                  Comfortable air-conditioned transport
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiUser className="text-accent-500" size={20} />
                <span className="text-black">
                  Professional English-speaking guide
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiArrowRight className="text-accent-500" size={20} />
                <span className="text-black">Border crossing assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-accent-500" size={20} />
                <span className="text-black">
                  Cultural stop at White Temple
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiCoffee className="text-accent-500" size={20} />
                <span className="text-black">Lunch break</span>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-center">
              <h3 className="text-2xl font-light">Complete Package</h3>
            </CardHeader>
            <CardBody className="p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-light text-accent-600 mb-2">
                  {mainPackage?.price?.toLocaleString() || "4,200"}
                </div>
                <div className="text-black text-lg mb-4">
                  {mainPackage?.currency || "THB"} per person
                </div>
                {mainPackage?.isPopular && (
                  <Chip color="warning" variant="flat" className="mb-6">
                    Popular Choice
                  </Chip>
                )}
                {!mainPackage?.isAvailable && (
                  <Chip color="danger" variant="flat" className="mb-6">
                    Currently Unavailable
                  </Chip>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between">
                  <span className="text-black">Advance booking:</span>
                  <span className="text-black font-medium">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Departure Time:</span>
                  <span className="text-black font-medium">09:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Return Time:</span>
                  <span className="text-black font-medium">~7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Duration:</span>
                  <span className="text-black font-medium">Full Day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Group Size:</span>
                  <span className="text-black font-medium">Max 12 people</span>
                </div>
              </div>

              <Button
                as={NextLink}
                href="/contact"
                className="w-full bg-accent-500 text-white hover:bg-accent-600 font-light rounded-full py-3"
                size="lg">
                Book Now
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
