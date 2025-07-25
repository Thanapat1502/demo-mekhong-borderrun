"use client";

import { useEffect } from "react";
import { Button, Chip } from "@heroui/react";
import NextLink from "next/link";
import { FiCheck } from "react-icons/fi";
import { usePackageStore } from "@/store/zustand/packageStore";

export default function AboutSection() {
  const { packages, fetchPackages, isLoading } = usePackageStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Get the main package for pricing display
  const mainPackage =
    packages.find(
      (pkg) =>
        pkg.name.toLowerCase().includes("border") ||
        pkg.name.toLowerCase().includes("complete")
    ) || packages[0];

  return (
    <section className="py-12 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8 leading-tight">
              Professional Border
              <span className="block text-accent-500">Run Service</span>
            </h2>
            <p className="text-lg text-black leading-relaxed mb-8">
              Experience hassle-free visa extension with our premium one-day
              service from Chiang Mai to the Huay Xai border in Laos. We handle
              every detail so you can focus on your journey.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <FiCheck className="text-accent-600" size={20} />
              </div>
              <span className="text-black">Licensed TAT Operator</span>
            </div>
            <Button
              as={NextLink}
              href="/our-services"
              variant="bordered"
              className="border-accent-500 text-accent-600 hover:bg-accent-50 px-8 py-3 rounded-full font-light">
              Explore Our Services
            </Button>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-500">
              <div className="text-center">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-6"></div>
                  </div>
                ) : mainPackage ? (
                  <>
                    <div className="text-5xl font-light text-accent-500 mb-4">
                      {mainPackage.price.toLocaleString()}
                    </div>
                    <div className="text-black text-lg mb-2">
                      {mainPackage.currency}
                    </div>
                    <div className="text-black font-medium text-xl mb-6">
                      {mainPackage.name}
                    </div>
                    {mainPackage.isPopular && (
                      <Chip color="warning" variant="flat" className="mb-4">
                        Popular Choice
                      </Chip>
                    )}
                  </>
                ) : (
                  <div className="text-gray-500 mb-6">
                    Pricing information not available
                  </div>
                )}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    <span className="text-black">Round-trip transport</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    <span className="text-black">Professional guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    <span className="text-black">Border assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
