"use client";
import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/home/other3.jpg"
          alt="Mekong Border Run Services"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-32">
        <h1 className="text-5xl md:text-6xl font-light text-white mb-8 leading-tight">
          Our Services
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
          Professional border run service with daily departures from Chiang Mai
          to Huay Xai, Laos
        </p>
      </div>
    </section>
  );
}
