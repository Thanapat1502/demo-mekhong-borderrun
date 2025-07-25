"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import { useEffect, useState, useRef, useCallback } from "react";
import { useContentStore } from "@/store/zustand/contentStore";
import { heroImages } from "@/data/images/heroImage";
import { useWebConfigStore } from "@/store/zustand/webConfigStore";

// Highly optimized loading placeholder to prevent layout shifts
const LoadingPlaceholder = ({
  height = "h-96",
  className = "",
}: {
  height?: string;
  className?: string;
}) => (
  <div
    className={`${height} bg-gray-100 animate-pulse rounded-lg ${className}`}
    style={{
      minHeight:
        height === "h-96" ? "384px" : height === "h-32" ? "128px" : "200px",
      contentVisibility: "auto", // Optimize rendering performance
      containIntrinsicSize: "1px 200px", // Provide intrinsic size for better layout
    }}
    aria-label="Loading content..."
  />
);

// Critical sections - load immediately with SSR
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  loading: () => <LoadingPlaceholder />,
  ssr: true, // Enable SSR for above-fold content
});

// Non-critical sections - lazy load without SSR
const JourneySection = dynamic(
  () => import("@/components/home/JourneySection"),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false,
  }
);

const PickupPointsSection = dynamic(
  () => import("@/components/home/PickupPointsSection"),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false,
  }
);

const TestimonialSection = dynamic(
  () => import("@/components/home/TestimonialSection"),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false,
  }
);

const ContactSection = dynamic(
  () => import("@/components/home/ContactSection"),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false,
  }
);

const SharedCTASection = dynamic(
  () => import("@/components/shared/SharedCTASection"),
  {
    loading: () => <LoadingPlaceholder height="h-32" />,
    ssr: false,
  }
);

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold, rootMargin: "100px" } // Load 100px before entering viewport
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, elementRef };
};

// Lazy section wrapper component
const LazySection = ({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) => {
  const { isVisible, elementRef } = useIntersectionObserver();

  return <div ref={elementRef}>{isVisible ? children : fallback}</div>;
};

export default function Home() {
  const { config } = useWebConfigStore();

  const {
    fetchJourneyImages,
    fetchGalleryImages,
    fetchPickupPointImages,
    journeyImages,
    galleryImages,
    pickupPointImages,
  } = useContentStore();

  // State for controlling data fetching
  const [dataFetched, setDataFetched] = useState({
    journey: false,
    gallery: false,
    pickup: false,
  });

  // Optimized data fetching with debouncing and caching
  const fetchJourneyData = useCallback(async () => {
    if (!dataFetched.journey) {
      try {
        // Use Promise.allSettled to prevent one failure from blocking others
        const results = await Promise.allSettled([
          fetchJourneyImages(),
          fetchGalleryImages(),
        ]);

        // Log any failures but don't block the UI
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.warn(
              `Failed to fetch ${index === 0 ? "journey" : "gallery"} images:`,
              result.reason
            );
          }
        });

        setDataFetched((prev) => ({ ...prev, journey: true, gallery: true }));
      } catch (error) {
        console.error("Error fetching journey data:", error);
      }
    }
  }, [dataFetched.journey, fetchJourneyImages, fetchGalleryImages]);

  const fetchPickupData = useCallback(async () => {
    if (!dataFetched.pickup) {
      try {
        await fetchPickupPointImages();
        setDataFetched((prev) => ({ ...prev, pickup: true }));
      } catch (error) {
        console.error("Error fetching pickup data:", error);
      }
    }
  }, [dataFetched.pickup, fetchPickupPointImages]);

  return (
    <div className="bg-white">
      {/* Hero Section - Always load immediately */}
      <HeroSection
        heroImages={heroImages}
        subtitle={config.website_description}
      />

      {/* About Section - Load immediately as it's above fold */}
      <AboutSection />

      {/* Journey Section - Only render when data is available */}
      <LazySection fallback={<LoadingPlaceholder />}>
        <div
          onMouseEnter={fetchJourneyData}
          onFocus={fetchJourneyData}
          onTouchStart={fetchJourneyData} // Add touch support for mobile
        >
          {journeyImages.length > 0 && galleryImages.length > 0 ? (
            <JourneySection
              journeyImages={journeyImages}
              galleryImages={galleryImages}
            />
          ) : (
            <div className="h-96 flex items-center justify-center">
              <p className="text-gray-500">Loading journey content...</p>
            </div>
          )}
        </div>
      </LazySection>

      {/* Pickup Points Section - Only render when data is available */}
      <LazySection fallback={<LoadingPlaceholder />}>
        <div
          onMouseEnter={fetchPickupData}
          onFocus={fetchPickupData}
          onTouchStart={fetchPickupData} // Add touch support for mobile
        >
          {pickupPointImages.length > 0 ? (
            <PickupPointsSection pickupPointImages={pickupPointImages} />
          ) : (
            <div className="h-96 flex items-center justify-center">
              <p className="text-gray-500">Loading pickup points...</p>
            </div>
          )}
        </div>
      </LazySection>

      {/* Testimonial Section - Lazy load with minimal fallback */}
      <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <TestimonialSection />
      </LazySection>

      {/* Contact Section - Lazy load with minimal fallback */}
      <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ContactSection />
      </LazySection>

      {/* CTA Section - Lazy load with minimal fallback */}
      <LazySection
        fallback={<div className="h-32 bg-primary-900 animate-pulse" />}>
        <SharedCTASection
          subtitle="Join hundreds of satisfied travelers who trust us with their visa extension needs"
          backgroundColor="bg-primary-900">
          Ready for Your
          <span className="block text-accent-400">Border Run?</span>
        </SharedCTASection>
      </LazySection>
    </div>
  );
}
