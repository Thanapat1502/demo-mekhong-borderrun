"use client";

import { Card, CardHeader, CardBody, Button, Avatar } from "@heroui/react";
import {
  FiPhone,
  FiMessageCircle,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import {
  useContactStore,
  getPrimaryContact,
} from "@/store/zustand/contactStore";

export default function ContactInfo() {
  const { contactInfo, ownerInfo, businessInfo } = useContactStore();

  // Get specific contact info using the helper function
  const phoneInfo = getPrimaryContact(contactInfo, "phone");
  const whatsappInfo = contactInfo.find((info) => info.type === "whatsapp");
  const emailInfo = getPrimaryContact(contactInfo, "email");
  const addressInfo = getPrimaryContact(contactInfo, "address");
  const lineInfo = contactInfo.find((info) => info.type === "line");

  // Fallback data
  const defaultPhone = "+66 (0) 95 102 9528";
  const defaultEmail = "info@mekong-borderrun.com";
  return (
    <Card className="shadow-2xl">
      <CardHeader className="bg-accent-500 text-white">
        <h2 className="text-2xl font-light">Get In Touch</h2>
      </CardHeader>
      <CardBody className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <Avatar
            src={ownerInfo?.avatar || "/owner-photo.jpg"}
            alt={ownerInfo?.name || "Mekong Transfer"}
            className="w-20 h-20"
            fallback={ownerInfo?.name?.charAt(0) || "MT"}
          />
          <div>
            <h3 className="text-xl font-medium text-black">
              {ownerInfo?.name ||
                businessInfo?.businessName ||
                "Mekong Border Run"}
            </h3>
            <p className="text-black">
              {ownerInfo?.title || "Licensed Tour Operator"}
            </p>
            <p className="text-base text-black">
              {businessInfo?.tatLicense || "TAT License No. 21/01279"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <FiPhone className="text-accent-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-black">Phone</h4>
              <a
                href={`tel:${phoneInfo?.value || defaultPhone}`}
                className="text-accent-600 font-medium hover:text-accent-700 transition-colors duration-200">
                {phoneInfo?.value || defaultPhone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <FiMessageCircle className="text-accent-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-black">WhatsApp</h4>
              <a
                href={`https://wa.me/${(
                  whatsappInfo?.value ||
                  phoneInfo?.value ||
                  defaultPhone
                ).replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 font-medium hover:text-accent-700 transition-colors duration-200">
                {whatsappInfo?.value || phoneInfo?.value || defaultPhone}
              </a>
            </div>
          </div>

          {lineInfo && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <FiMessageCircle className="text-accent-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-black">LINE</h4>
                <a
                  href={
                    lineInfo.value.startsWith("http")
                      ? lineInfo.value
                      : `https://line.me/ti/p/~${lineInfo.value}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 font-medium hover:text-accent-700 transition-colors duration-200">
                  {lineInfo.value}
                </a>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <FiMail className="text-accent-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-black">Email</h4>
              <a
                href={`mailto:${emailInfo?.value || defaultEmail}`}
                className="text-accent-600 font-medium hover:text-accent-700 transition-colors duration-200">
                {emailInfo?.value || defaultEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <FiMapPin className="text-accent-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-black">Location</h4>
              <p className="text-black">
                {addressInfo?.value ||
                  (businessInfo?.address &&
                  typeof businessInfo.address === "object"
                    ? `${businessInfo.address.city}, ${businessInfo.address.province}`
                    : typeof businessInfo?.address === "string"
                    ? businessInfo.address
                    : "Chiang Mai, Thailand")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <FiClock className="text-accent-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-black">Service Hours</h4>
              <p className="text-black">Daily Departure: 09:30 AM</p>
              <p className="text-black">Booking: 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {phoneInfo && (
            <Button
              as="a"
              href={`tel:${phoneInfo.value.replace(/\s/g, "")}`}
              className="bg-accent-500 text-white hover:bg-accent-600 rounded-full"
              size="lg">
              Call Now
            </Button>
          )}
          {whatsappInfo && (
            <Button
              as="a"
              href={`https://wa.me/${whatsappInfo.value.replace(
                /[^0-9]/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="bordered"
              className="border-accent-500 text-accent-600 hover:bg-accent-50 rounded-full"
              size="lg">
              WhatsApp
            </Button>
          )}
          {lineInfo && (
            <Button
              as="a"
              href={
                lineInfo.value.startsWith("http")
                  ? lineInfo.value
                  : `https://line.me/ti/p/~${lineInfo.value}`
              }
              target="_blank"
              rel="noopener noreferrer"
              variant="bordered"
              className="border-accent-500 text-accent-600 hover:bg-accent-50 rounded-full"
              size="lg">
              LINE
            </Button>
          )}
          {emailInfo && (
            <Button
              as="a"
              href={`mailto:${emailInfo.value}`}
              variant="bordered"
              className="border-accent-500 text-accent-600 hover:bg-accent-50 rounded-full"
              size="lg">
              Email
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
