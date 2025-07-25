"use client";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";
import SharedCTASection from "@/components/shared/SharedCTASection";
import { useContactStore } from "@/store/zustand/contactStore";

export default function Contact() {
  const { ownerInfo, contactInfo, businessInfo, isLoading, error } =
    useContactStore();

  // Show loading state while fetching contact data
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <ContactHero />
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-pulse">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show error state if contact data failed to load
  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <ContactHero />
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-500 text-lg">
              Failed to load contact information. Please try again later.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Show message if no contact data available
  if (contactInfo.length === 0 && !ownerInfo && !businessInfo) {
    return (
      <div className="bg-white min-h-screen">
        <ContactHero />
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500 text-lg">
              Contact information is not available at the moment.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <ContactHero />

      {/* Contact Information & Form */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Only render FAQ if we have owner phone data */}
      {ownerInfo?.phone && <ContactFAQ phone={ownerInfo.phone} />}

      <SharedCTASection
        subtitle="Get in touch with us today and let us handle your visa extension needs"
        primaryButtonText="Send Message"
        primaryButtonHref="#contact-form"
        backgroundColor="bg-primary-800">
        Ready to Get Started?
      </SharedCTASection>
    </div>
  );
}
