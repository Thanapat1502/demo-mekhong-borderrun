"use client";

import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import NextLink from "next/link";

export default function Services() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-green-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional border run service with daily departures from Chiang
            Mai to Huay Xai, Laos
          </p>
        </div>
      </section>

      {/* Main Service Package */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Service Details */}
            <Card className="shadow-xl">
              <CardHeader className="bg-brand-500 text-white p-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    ONE DAY TRIP TO HUAYXAI BORDER
                  </h2>
                  <p className="text-brand-100">Complete visa run service</p>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Service:</span>
                    <Chip color="success" variant="flat" size="lg">
                      Daily Departure
                    </Chip>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Price:</span>
                    <span className="text-3xl font-bold text-brand-600">
                      4,100 THB
                    </span>
                  </div>
                  <Chip
                    color="warning"
                    variant="flat"
                    className="w-full text-center">
                    Special Offer - Limited Time
                  </Chip>
                  <Button
                    as={NextLink}
                    href="/contact"
                    className="w-full bg-brand-500 text-white hover:bg-brand-600"
                    size="lg">
                    Book Now
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Detailed Itinerary */}
            <Card className="shadow-xl">
              <CardHeader className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Detailed Itinerary
                </h3>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-brand-600">09:30</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        Pick up from Chiang Mai
                      </p>
                      <p className="text-gray-600">
                        Comfortable air-conditioned vehicle pickup from your
                        accommodation or designated meeting points
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-brand-600">12:30</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        Lunch at White Temple
                      </p>
                      <p className="text-gray-600">
                        Stop in Chiang Rai for lunch and visit the famous White
                        Temple (Wat Rong Khun)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-brand-600">15:30</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Arrive at Border</p>
                      <p className="text-gray-600">
                        Reach Chiang Khong border crossing and proceed to Huay
                        Xai, Laos for visa processing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-brand-600">16:00</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Return Journey</p>
                      <p className="text-gray-600">
                        Begin return trip to Chiang Mai with new entry stamp
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Service Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pickup Points */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800">
                  Pickup Points
                </h3>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-brand-500 rounded-full"></span>
                    <span>Chiang Mai downtown</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-brand-500 rounded-full"></span>
                    <span>ThaPae gate, ChiangMai gate</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-brand-500 rounded-full"></span>
                    <span>Central Festival</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-brand-500 rounded-full"></span>
                    <span>MAYA ChiangMai</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            {/* What's Included */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800">
                  What&apos;s Included
                </h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">
                      ✓ Included:
                    </h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Round-trip transportation</li>
                      <li>• Professional driver</li>
                      <li>• Air-conditioned vehicle</li>
                      <li>• Border assistance</li>
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* What's Excluded */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800">
                  What&apos;s Excluded
                </h3>
              </CardHeader>
              <CardBody>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">
                    ✗ Not Included:
                  </h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Laos visa fee</li>
                    <li>• Border shuttle bus</li>
                    <li>• Meals (except lunch stop)</li>
                    <li>• Personal expenses</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Important Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-800">
                  Requirements
                </h3>
              </CardHeader>
              <CardBody>
                <ul className="space-y-2 text-gray-600">
                  <li>• Valid passport with at least 6 months validity</li>
                  <li>• Passport photos (recommended)</li>
                  <li>• Cash for Laos visa fee (if required)</li>
                  <li>• Comfortable clothing for travel</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-800">
                  Booking Policy
                </h3>
              </CardHeader>
              <CardBody>
                <ul className="space-y-2 text-gray-600">
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

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Book Your Border Run?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to secure your spot on our next departure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={NextLink}
              href="/contact"
              size="lg"
              className="bg-brand-500 text-white hover:bg-brand-600 px-8">
              Book Your Trip
            </Button>
            <Button
              as="a"
              href="tel:+66951029528"
              variant="bordered"
              size="lg"
              className="border-brand-500 text-brand-600 hover:bg-brand-50 px-8">
              Call +66 95 102 9528
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
