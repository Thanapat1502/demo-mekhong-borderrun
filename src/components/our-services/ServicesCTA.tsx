"use client";
import { Button } from "@heroui/react";
import NextLink from "next/link";

export default function ServicesCTA() {
  return (
    <section className="py-12 px-6 bg-primary-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-light text-white mb-8">
          Ready to Book Your Border Run?
        </h2>
        <p className="text-xl text-primary-200 mb-8">
          Contact us today to secure your spot on our next departure
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            as={NextLink}
            href="/contact"
            size="lg"
            className="bg-accent-500 text-white hover:bg-accent-600 px-12 py-4 text-lg font-light rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Book Your Trip
          </Button>
          <Button
            as="a"
            href="tel:+66951029528"
            variant="bordered"
            size="lg"
            className="border-2 border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-white px-12 py-4 text-lg font-light rounded-full transition-all duration-300">
            Call +66 95 102 9528
          </Button>
        </div>
      </div>
    </section>
  );
}
