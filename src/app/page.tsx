"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import { useEffect, useState, useRef } from "react";
import { useContentStore } from "@/store/zustand/contentStore";
import { heroImages } from "@/data/images/heroImage";
import { useWebConfigStore } from "@/store/zustand/webConfigStore";

// Optimized loading placeholder component
const LoadingPlaceholder = ({ height = "h-96" }: { height?: string }) => (
  <div
    className={`${height} bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  </div>
);

// Dynamic imports with optimized loading states and SSR disabled for performance
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  loading: () => <LoadingPlaceholder />,
  ssr: false,
});

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

const CTASection = dynamic(() => import("@/components/home/CTASection"), {
  loading: () => <LoadingPlaceholder height="h-32" />,
  ssr: false,
});

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

  // Optimized data fetching - only fetch when needed
  const fetchJourneyData = async () => {
    if (!dataFetched.journey) {
      await fetchJourneyImages();
      await fetchGalleryImages();
      setDataFetched((prev) => ({ ...prev, journey: true, gallery: true }));
    }
  };

  const fetchPickupData = async () => {
    if (!dataFetched.pickup) {
      await fetchPickupPointImages();
      setDataFetched((prev) => ({ ...prev, pickup: true }));
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Always load immediately */}
      <HeroSection
        heroImages={heroImages}
        subtitle={config.website_description}
      />

      {/* About Section - Load immediately as it's above fold */}
      <AboutSection />

      {/* Journey Section - Lazy load with data fetching */}
      <LazySection fallback={<LoadingPlaceholder />}>
        <div onMouseEnter={fetchJourneyData} onFocus={fetchJourneyData}>
          <JourneySection
            journeyImages={journeyImages}
            galleryImages={galleryImages}
          />
        </div>
      </LazySection>

      {/* Pickup Points Section - Lazy load with data fetching */}
      <LazySection fallback={<LoadingPlaceholder />}>
        <div onMouseEnter={fetchPickupData} onFocus={fetchPickupData}>
          <PickupPointsSection pickupPointImages={pickupPointImages} />
        </div>
      </LazySection>

      {/* Testimonial Section - Lazy load */}
      <LazySection fallback={<LoadingPlaceholder />}>
        <TestimonialSection />
      </LazySection>

      {/* Contact Section - Lazy load */}
      <LazySection fallback={<LoadingPlaceholder />}>
        <ContactSection />
      </LazySection>

      {/* CTA Section - Lazy load */}
      <LazySection fallback={<LoadingPlaceholder height="h-32" />}>
        <CTASection />
      </LazySection>
    </div>
  );
}
