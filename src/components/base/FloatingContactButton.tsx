"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaLine,
  FaComments,
  FaTimes,
} from "react-icons/fa";

/**
 * FloatingContactButton - A reusable floating contact button component
 *
 * Features:
 * - Expandable contact options (Email, Phone, WhatsApp, Line)
 * - Smooth animations and hover effects
 * - Tooltips for better UX
 * - Responsive design
 * - Customizable styling via className prop
 *
 * Usage:
 * <FloatingContactButton className="custom-styles" />
 */
interface FloatingContactButtonProps {
  className?: string;
}

export default function FloatingContactButton({
  className = "",
}: FloatingContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: FaEnvelope,
      label: "Email Us",
      sublabel: "mekongborderrun@gmail.com",
      href: "mailto:mekongborderrun@gmail.com",
      bgColor:
        "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      textColor: "text-white",
      borderColor: "border-blue-500",
    },
    {
      icon: FaPhone,
      label: "Call Now",
      sublabel: "+66 95 102 9528",
      href: "tel:+66951029528",
      bgColor:
        "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      textColor: "text-white",
      borderColor: "border-green-500",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      sublabel: "Quick Response",
      href: "https://wa.me/66951029528",
      bgColor:
        "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
      textColor: "text-white",
      target: "_blank",
      borderColor: "border-green-600",
    },
    {
      icon: FaLine,
      label: "LINE Chat",
      sublabel: "@mekongborderrun",
      href: "https://line.me/ti/p/~@mekongborderrun",
      bgColor:
        "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600",
      textColor: "text-white",
      target: "_blank",
      borderColor: "border-green-400",
    },
  ];

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-6 sm:right-6 z-50 ${className}`}>
      {/* Bubble Window Menu */}
      <div
        className={`absolute bottom-full right-0 mb-4 transition-all duration-500 transform ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}>
        <div className="bg-primary-800 rounded-2xl shadow-2xl border border-primary-700 p-4 min-w-[240px] relative">
          {/* Bubble Arrow */}
          <div className="absolute top-full right-6 transform">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary-800"></div>
          </div>

          {/* Contact Options */}
          <div className="space-y-2">
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.label}
                  as="a"
                  href={option.href}
                  target={option.target}
                  className="w-full h-12 bg-primary-800 hover:bg-white/10 text-accent-400 hover:text-accent-300 rounded-xl flex items-center justify-start px-4 gap-3 transition-all duration-200 group border-0"
                  style={{
                    animationDelay: isOpen ? `${index * 50}ms` : "0ms",
                  }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-800 flex-shrink-0 group-hover:scale-110 transition-all duration-200">
                    <IconComponent className="text-base font-bold text-accent-400" />
                  </div>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="font-medium text-base text-accent-400 group-hover:text-accent-300 leading-tight transition-colors duration-200">
                      {option.label}
                    </span>
                    <span className="text-base text-accent-400/70 group-hover:text-accent-300/70 leading-tight truncate w-full transition-colors duration-200">
                      {option.sublabel}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Toggle Button - New Design */}
      <div className="relative">
        <Button
          onPress={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group ${
            isOpen
              ? "bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white scale-110 rotate-180"
              : "bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 text-white hover:scale-105"
          }`}
          isIconOnly>
          {/* Background Animation */}
          <div
            className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
              isOpen
                ? "from-red-400 via-red-500 to-red-600 opacity-100"
                : "from-accent-400 via-accent-500 to-accent-600 opacity-0 group-hover:opacity-100"
            }`}></div>

          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? (
              <FaTimes className="text-2xl transition-transform duration-300" />
            ) : (
              <FaComments className="text-2xl transition-transform duration-300 group-hover:scale-110" />
            )}
          </div>

          {/* Pulse Ring */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full border-2 border-accent-400 animate-ping opacity-30"></div>
          )}
        </Button>
      </div>
    </div>
  );
}
