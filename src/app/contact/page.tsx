"use client";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";
import SharedCTASection from "@/components/shared/SharedCTASection";
import { useContactStore } from "@/store/zustand/contactStore";

export default function Contact() {
  const { ownerInfo } = useContactStore();
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

      <ContactFAQ phone={ownerInfo?.phone || "+66 (0) 95 102 9528"} />

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
