import { Button } from "@heroui/react";
import NextLink from "next/link";
import { useContactStore } from "@/store/zustand/contactStore";
export default function CustomersCTA() {
  const { ownerInfo } = useContactStore();
  return (
    <section className="py-12 px-6 bg-primary-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-light text-white mb-8">
          Join Our Happy Customers
        </h2>
        <p className="text-xl text-primary-200 mb-8">
          Experience the same professional service that our customers love
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
            href={`tel:${ownerInfo?.phone?.replace(/\s/g, "")}`}
            variant="bordered"
            size="lg"
            className="border-2 border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-white px-12 py-4 text-lg font-light rounded-full transition-all duration-300">
            Call Now
          </Button>
        </div>
      </div>
    </section>
  );
}
