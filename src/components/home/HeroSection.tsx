"use client";

import { Button } from "@heroui/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/image/home/other3.jpg",
    "/image/home/other1.jpg",
    "/image/home/other2.jpg",
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background with Smooth Transition */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              transform: `translateY(${scrollY * 0.5}px)`,
              filter: "brightness(0.6)",
            }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide animate-slide-up">
              Mekong
              <span
                className="block font-extralight text-accent-400 animate-slide-up"
                style={{ animationDelay: "0.2s" }}>
                Border Run
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed opacity-90 animate-slide-up"
              style={{ animationDelay: "0.4s" }}>
              Extend visa with our professional one-day service. Round trip from
              Chiang Mai to Huay Xai, Laos. Get your new entry stamp and legally
              extend your stay in Thailand.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up"
              style={{ animationDelay: "0.6s" }}>
              <Button
                as={NextLink}
                href="/contact"
                size="lg"
                className="bg-accent-500 text-white hover:bg-accent-600 px-12 py-4 text-lg font-light rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                Reserve Your Journey
              </Button>
              <Button
                as="a"
                href="tel:+66951029528"
                variant="bordered"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-800 px-12 py-4 text-lg font-light rounded-full transition-all duration-300">
                +66 95 102 9528
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <FiChevronDown className="mt-2 animate-pulse" size={16} />
        </div>
      </div>
    </section>
  );
}
