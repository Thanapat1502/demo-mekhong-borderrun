"use client";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";
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
    </div>
  );
}
