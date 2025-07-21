import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";

// Dynamic imports for below-the-fold content
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const JourneySection = dynamic(
  () => import("@/components/home/JourneySection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const PickupPointsSection = dynamic(
  () => import("@/components/home/PickupPointsSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const TestimonialSection = dynamic(
  () => import("@/components/home/TestimonialSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const ContactSection = dynamic(
  () => import("@/components/home/ContactSection"),
  {
    loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  }
);

const CTASection = dynamic(() => import("@/components/home/CTASection"), {
  loading: () => <div className="h-32 bg-gray-50 animate-pulse" />,
});

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <PickupPointsSection />
      <TestimonialSection />
      <ContactSection />
      <CTASection />
    </div>
  );
}
