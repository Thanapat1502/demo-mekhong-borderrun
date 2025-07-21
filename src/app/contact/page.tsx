import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact Us - Book Your Border Run Service Chiang Mai",
  description:
    "Contact Mekong Border Run to book your visa extension service from Chiang Mai to Laos. Call +66 95 102 9528 or use our contact form. Professional TAT licensed service with daily departures.",
  keywords: [
    "contact border run service",
    "book visa extension",
    "Chiang Mai contact",
    "border run booking",
    "visa service contact",
    "Thailand Laos border contact",
    "TAT licensed contact",
    "visa extension booking",
    "Mekong transfer contact",
    "border run phone number",
    "visa service inquiry",
    "Chiang Mai visa contact",
  ],
  openGraph: {
    title: "Contact Us - Book Your Border Run Service Chiang Mai",
    description:
      "Contact Mekong Border Run to book your visa extension service from Chiang Mai to Laos. Professional TAT licensed service.",
    url: "https://mekong-transfer.vercel.app/contact",
    type: "website",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Mekong Border Run Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Book Your Border Run Service Chiang Mai",
    description:
      "Contact Mekong Border Run to book your visa extension service from Chiang Mai to Laos.",
    images: ["/og-contact.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <ContactHero />

      {/* Contact Information & Form */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactFAQ />
    </div>
  );
}
