"use client";
import { Avatar } from "@heroui/react";

export default function TestimonialSection() {
  return (
    <section className="py-12 px-6 bg-gradient-to-br from-accent-50 to-neutral-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl text-accent-200 mb-6">&quot;</div>
          <p className="text-2xl md:text-3xl font-light text-black leading-relaxed mb-8 italic">
            Exceptional service from start to finish. Professional, punctual,
            and completely stress-free experience.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Avatar
              src="https://i.pravatar.cc/150?img=15"
              alt="Customer"
              className="w-16 h-16"
            />
            <div className="text-left">
              <div className="font-medium text-black">Michael Chang</div>
              <div className="text-black">Digital Nomad</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-light text-accent-600 mb-2">500+</div>
            <div className="text-black">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-accent-600 mb-2">100%</div>
            <div className="text-black">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-accent-600 mb-2">5★</div>
            <div className="text-black">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
