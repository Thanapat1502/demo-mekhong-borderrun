"use client";

import { Button } from "@heroui/react";
import NextLink from "next/link";
import { useContactStore } from "@/store/zustand/contactStore";

interface SharedCTASectionProps {
  children: React.ReactNode; // Header content passed as children
  subtitle: string; // Subtitle text
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  showPhoneButton?: boolean;
  backgroundColor?: string;
  className?: string;
}

export default function SharedCTASection({
  children,
  subtitle,
  primaryButtonText = "Book Your Journey",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Call Now",
  showPhoneButton = true,
  backgroundColor = "bg-primary-900",
  className = "",
}: SharedCTASectionProps) {
  const { ownerInfo } = useContactStore();

  return (
    <section className={`py-12 px-6 ${backgroundColor} ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header passed as children */}
        <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
          {children}
        </h2>
        
        {/* Subtitle as text */}
        <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            as={NextLink}
            href={primaryButtonHref}
            size="lg"
            className="bg-accent-500 text-white hover:bg-accent-600 px-12 py-4 text-lg font-light rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            {primaryButtonText}
          </Button>
          
          {showPhoneButton && ownerInfo?.phone && (
            <Button
              as="a"
              href={`tel:${ownerInfo.phone.replace(/\s/g, "")}`}
              variant="bordered"
              size="lg"
              className="border-2 border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-white px-12 py-4 text-lg font-light rounded-full transition-all duration-300">
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

// Predefined CTA variants for common use cases
export const HomeCTASection = () => (
  <SharedCTASection
    subtitle="Join hundreds of satisfied travelers who trust us with their visa extension needs"
    backgroundColor="bg-primary-900">
    Ready for Your
    <span className="block text-accent-400">Border Run?</span>
  </SharedCTASection>
);

export const ServicesCTASection = () => (
  <SharedCTASection
    subtitle="Contact us today to secure your spot on our next departure"
    primaryButtonText="Book Your Trip"
    backgroundColor="bg-primary-800">
    Ready to Book Your Border Run?
  </SharedCTASection>
);

export const CustomersCTASection = () => (
  <SharedCTASection
    subtitle="Experience the same professional service that our customers love"
    primaryButtonText="Book Your Trip"
    backgroundColor="bg-primary-800">
    Join Our Happy Customers
  </SharedCTASection>
);

export const ContactCTASection = () => (
  <SharedCTASection
    subtitle="Get in touch with us today and let us handle your visa extension needs"
    primaryButtonText="Send Message"
    primaryButtonHref="#contact-form"
    backgroundColor="bg-primary-800">
    Ready to Get Started?
  </SharedCTASection>
);
