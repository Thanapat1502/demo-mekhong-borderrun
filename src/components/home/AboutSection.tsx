"use client";

import { Button, Chip } from "@heroui/react";
import NextLink from "next/link";
import { FiCheck } from "react-icons/fi";

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="text-center">
                <div className="text-5xl font-light text-accent-500 mb-4">
                  4,100
                </div>
                <div className="text-black text-lg mb-2">THB</div>
                <div className="text-black font-medium text-xl mb-6">
                  Complete Service
                </div>
                <Chip color="warning" variant="flat" className="mb-4">
                  Daily Departures
                </Chip>
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
