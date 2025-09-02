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
  const { contactInfo, ownerInfo, businessInfo, isLoading } = useContactStore();

  // Get specific contact info using the helper function
  const phoneInfo = getPrimaryContact(contactInfo, "phone");
  const whatsappInfo = contactInfo.find((info) => info.type === "whatsapp");
  const emailInfo = getPrimaryContact(contactInfo, "email");
  const addressInfo = getPrimaryContact(contactInfo, "address");
  const lineInfo = contactInfo.find((info) => info.type === "line");

  // Show loading state
  if (isLoading) {
    return (
      <Card className="shadow-2xl bg-white">
        <CardHeader className="bg-accent-500 text-white">
          <h2 className="text-2xl font-light">Get In Touch</h2>
        </CardHeader>
        <CardBody className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }
  return (
    <Card className="shadow-2xl bg-white">
      <CardHeader className="bg-accent-500 text-white">
        <h2 className="text-2xl font-light">Get In Touch</h2>
      </CardHeader>
      <CardBody className="p-8">
        {/* Only show owner/business info if data is available */}
        {(ownerInfo || businessInfo) && (
          <div className="flex items-center gap-6 mb-8">
            <Avatar
              src={ownerInfo?.avatar}
              alt={ownerInfo?.name || businessInfo?.businessName}
              className="w-20 h-20"
              fallback={
                ownerInfo?.name?.charAt(0) ||
                businessInfo?.businessName?.charAt(0)
              }
            />
            <div>
              {(ownerInfo?.name || businessInfo?.businessName) && (
                <h3 className="text-xl font-medium text-black">
                  {ownerInfo?.name || businessInfo?.businessName}
                </h3>
              )}
              {ownerInfo?.title && (
                <p className="text-black">{ownerInfo.title}</p>
              )}
              {businessInfo?.tatLicense && (
                <p className="text-base text-black">
                  {businessInfo.tatLicense}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Only show phone if data is available */}
          {phoneInfo && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <FiPhone className="text-accent-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-black">Phone</h4>
                <a
                  href={`tel:${phoneInfo.value}`}
                  className="text-accent-600 font-medium hover:text-accent-700 transition-colors duration-200">
                  {phoneInfo.value}
                </a>
              </div>
            </div>
          )}

          {/* Only show WhatsApp if data is available */}
          {(whatsappInfo || phoneInfo) && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <FiMessageCircle className="text-accent-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-black">WhatsApp</h4>
                <a
                  href={`https://wa.me/${(
                    whatsappInfo?.value || phoneInfo?.value
                  )?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 font-medium hover:text-accent-700 transition-colors duration-200">
                  {whatsappInfo?.value || phoneInfo?.value}
                </a>
              </div>
            </div>
          )}

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

          {/* Only show email if data is available */}
          {emailInfo && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <FiMail className="text-accent-600" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-black">Email</h4>
                <a
                  href={`mailto:${emailInfo.value}`}
                  className="text-accent-600 font-medium hover:text-accent-700 transition-colors duration-200">
                  {emailInfo.value}
                </a>
              </div>
            </div>
          )}

          {/* Only show location if data is available */}
          {(addressInfo || businessInfo?.address) && (
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
                      : "")}
                </p>
              </div>
            </div>
          )}

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

        {/* Only show action buttons if we have contact data */}
        {(phoneInfo || whatsappInfo || lineInfo || emailInfo) && (
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
            {(whatsappInfo || phoneInfo) && (
              <Button
                as="a"
                href={`https://wa.me/${(
                  whatsappInfo?.value || phoneInfo?.value
                )?.replace(/[^0-9]/g, "")}`}
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
        )}
      </CardBody>
    </Card>
  );
}
