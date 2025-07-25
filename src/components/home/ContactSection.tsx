"use client";

import { FiPhone, FiMessageCircle, FiMail } from "react-icons/fi";
import {
  useContactStore,
  getPrimaryContact,
} from "@/store/zustand/contactStore";

export default function ContactSection() {
  const { contactInfo, isLoading } = useContactStore();

  // Get specific contact info using the helper function
  const phoneInfo = getPrimaryContact(contactInfo, "phone");
  const emailInfo = getPrimaryContact(contactInfo, "email");
  const whatsappInfo = contactInfo.find((info) => info.type === "whatsapp");
  const lineInfo = contactInfo.find((info) => info.type === "line");

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-12 px-6 bg-primary-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-primary-200">Loading contact information...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm animate-pulse">
                <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12 px-6 bg-primary-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-white mb-6">Get In Touch</h2>
          <p className="text-primary-200">
            Multiple ways to reach us for your convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Only show phone if data is available */}
          {phoneInfo && (
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-accent-400 mb-4 flex justify-center">
                <FiPhone size={24} />
              </div>
              <h3 className="text-white font-medium mb-2">Phone</h3>
              <a
                href={`tel:${phoneInfo.value.replace(/\s/g, "")}`}
                className="text-accent-300 hover:text-accent-200 transition-colors">
                {phoneInfo.value}
              </a>
            </div>
          )}

          {/* Only show WhatsApp if data is available */}
          {(whatsappInfo || phoneInfo) && (
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-accent-400 mb-4 flex justify-center">
                <FiMessageCircle size={24} />
              </div>
              <h3 className="text-white font-medium mb-2">WhatsApp</h3>
              <a
                href={`https://wa.me/${(
                  whatsappInfo?.value || phoneInfo?.value
                )?.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-300 hover:text-accent-200 transition-colors">
                {whatsappInfo?.value || phoneInfo?.value}
              </a>
            </div>
          )}

          {/* Only show LINE if data is available */}
          {lineInfo && (
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-accent-400 mb-4 flex justify-center">
                <FiMessageCircle size={24} />
              </div>
              <h3 className="text-white font-medium mb-2">LINE</h3>
              <a
                href={
                  lineInfo.value.startsWith("http")
                    ? lineInfo.value
                    : `https://line.me/ti/p/~${lineInfo.value}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-300 hover:text-accent-200 transition-colors">
                {lineInfo.value}
              </a>
            </div>
          )}

          {/* Only show email if data is available */}
          {emailInfo && (
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-accent-400 mb-4 flex justify-center">
                <FiMail size={24} />
              </div>
              <h3 className="text-white font-medium mb-2">Email</h3>
              <a
                href={`mailto:${emailInfo.value}`}
                className="text-accent-300 hover:text-accent-200 transition-colors">
                {emailInfo.value}
              </a>
            </div>
          )}
        </div>

        {/* Show message if no contact data available */}
        {!phoneInfo && !whatsappInfo && !lineInfo && !emailInfo && (
          <div className="text-center text-primary-200">
            Contact information is not available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
