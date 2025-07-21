"use client";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { FiTruck, FiUser, FiCoffee, FiFileText } from "react-icons/fi";

export default function WhatsIncluded() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light text-black text-center mb-16">
          What&apos;s Included
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader className="flex gap-3">
              <FiTruck className="text-accent-500" size={24} />
              <h3 className="text-xl font-medium text-black">Transportation</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-black">
                <li>• Air-conditioned minivan</li>
                <li>• Professional driver</li>
                <li>• Hotel pickup & drop-off</li>
                <li>• Fuel and tolls included</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex gap-3">
              <FiUser className="text-accent-500" size={24} />
              <h3 className="text-xl font-medium text-black">Services</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-black">
                <li>• English-speaking guide</li>
                <li>• Border crossing assistance</li>
                <li>• Document checking</li>
                <li>• 24/7 support hotline</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex gap-3">
              <FiCoffee className="text-accent-500" size={24} />
              <h3 className="text-xl font-medium text-black">Meals & Stops</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-black">
                <li>• Lunch at local restaurant</li>
                <li>• White Temple visit</li>
                <li>• Rest stops along the way</li>
                <li>• Refreshments provided</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="flex gap-3">
              <FiFileText className="text-accent-500" size={24} />
              <h3 className="text-xl font-medium text-black">Requirements</h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-black">
                <li>• Valid passport (6+ months)</li>
                <li>• Passport photos (2 copies)</li>
                <li>• Cash for Laos visa (if needed)</li>
                <li>• Comfortable clothing</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
