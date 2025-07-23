"use client";

import { Divider, Link } from "@heroui/react";
import NextLink from "next/link";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/image/logo/40028.png"
                alt="Mekong Border Run Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <h3 className="font-bold text-xl text-accent-500">
                Mekong Border Run
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Professional border run service from Chiang Mai to Laos border.
              Licensed and reliable.
            </p>
            <p className="text-base text-gray-500">TAT License No. 21/01279</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                as={NextLink}
                href="/"
                className="block text-gray-600 hover:text-accent-500 transition-colors">
                Home
              </Link>
              <Link
                as={NextLink}
                href="/our-services"
                className="block text-gray-600 hover:text-accent-500 transition-colors">
                Services
              </Link>
              <Link
                as={NextLink}
                href="/customers"
                className="block text-gray-600 hover:text-accent-500 transition-colors">
                Our Customers
              </Link>
              <Link
                as={NextLink}
                href="/contact"
                className="block text-gray-600 hover:text-accent-500 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiPhone className="text-accent-500" size={16} />
                <a
                  href="tel:+66951029528"
                  className="text-gray-600 hover:text-accent-500 transition-colors">
                  +66 95 102 9528
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-accent-500" size={16} />
                <a
                  href="mailto:prpbee711@gmail.com"
                  className="text-gray-600 hover:text-accent-500 transition-colors">
                  prpbee711@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-accent-500" size={16} />
                <span className="text-gray-600">Chiang Mai, Thailand</span>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="text-accent-500" size={16} />
                <span className="text-gray-600">Daily Departure: 09:30 AM</span>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-base">
            © 2024 Mekong Border Run. All rights reserved.
          </p>
          <p className="text-gray-500 text-base mt-2 md:mt-0">
            Licensed Tour Operator - TAT License No. 21/01279
          </p>
        </div>
      </div>
    </footer>
  );
}
