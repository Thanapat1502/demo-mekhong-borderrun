"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { FiBookOpen, FiInfo } from "react-icons/fi";

export default function BookingInfo() {
  return (
    <section className="py-24 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light text-black text-center mb-16">
          Booking Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex gap-3">
              <FiBookOpen className="text-accent-500" size={24} />
              <h3 className="text-xl font-medium text-black">How to Book</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4 text-black">
                <p>1. Contact us via phone, WhatsApp, or LINE</p>
                <p>2. Provide your travel dates and pickup location</p>
                <p>3. Confirm your booking with payment</p>
                <p>4. Receive confirmation and pickup details</p>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex gap-3">
              <FiInfo className="text-accent-500" size={24} />
              <h3 className="text-xl font-medium text-black">Booking Policy</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-black">
                <li>• Advance booking recommended</li>
                <li>• Payment on pickup or advance transfer</li>
                <li>• Cancellation 24 hours before departure</li>
                <li>• Weather-dependent service</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
