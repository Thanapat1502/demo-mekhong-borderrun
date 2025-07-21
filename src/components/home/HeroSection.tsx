"use client";

import { Button } from "@heroui/react";
import NextLink from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = useMemo(
    () => [
      {
        src: "/image/home/other3.jpg",
        alt: "Mekong Border Run Service - Professional Visa Extension",
      },
      {
        src: "/image/home/other1.jpg",
        alt: "Chiang Mai to Laos Border Crossing",
      },
      {
        src: "/image/home/other2.jpg",
        alt: "Comfortable Transportation Service",
      },
    ],
    []
  );

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Images are now handled by Next.js Image component with priority loading

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Optimized Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateY(${scrollY * 0.3}px)`, // Reduced parallax intensity
            }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0} // Only prioritize first image
              quality={85}
              sizes="100vw"
              className="object-cover"
              style={{
                filter: "brightness(0.6)",
              }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
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
              Extend your stay in Thailand with our trusted one-day border run
              trip from Chiang Mai to Laos.
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
