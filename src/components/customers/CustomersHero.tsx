"use client";
import Image from "next/image";

export default function CustomersHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/home/other2.jpg"
          alt="Mekong Border Run Customers"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-14">
        <h1 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
          Our Customers
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
          Read what our satisfied customers say about their border run
          experience with us
        </p>
      </div>
    </section>
  );
}
