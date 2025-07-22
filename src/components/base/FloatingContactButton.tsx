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
  FaCog,
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
    {
      icon: FaCog,
      label: "Admin",
      sublabel: "Management",
      href: "/admin",
      bgColor:
        "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
      textColor: "text-white",
      borderColor: "border-gray-600",
    },
  ];

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Contact Options */}
      <div
        className={`flex flex-col justify-center items-center gap-3 mb-4 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}>
        {contactOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <div
              key={option.label}
              className={`relative transition-all duration-300`}
              style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}>
              <div className="group relative">
                <Button
                  as="a"
                  href={option.href}
                  target={option.target}
                  className={`${option.bgColor} ${option.textColor} shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px] h-16 rounded-2xl flex items-center justify-start px-4 border-2 ${option.borderColor} border-opacity-30`}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-xl group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="font-semibold text-sm leading-tight">
                        {option.label}
                      </span>
                      <span className="text-xs opacity-90 leading-tight truncate w-full">
                        {option.sublabel}
                      </span>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <Button
        onPress={() => setIsOpen(!isOpen)}
        className={`w-18 h-18 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white/30 ${
          isOpen
            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white scale-110"
            : "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white hover:scale-110"
        }`}
        isIconOnly>
        {isOpen ? (
          <FaTimes className="text-3xl" />
        ) : (
          <FaComments className="text-3xl animate-pulse" />
        )}
      </Button>
    </div>
  );
}
