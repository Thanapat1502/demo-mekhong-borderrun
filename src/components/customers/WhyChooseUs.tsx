import { FiTruck, FiClock, FiTarget } from "react-icons/fi";

export default function WhyChooseUs() {
  return (
    <section className="py-12 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-light text-black mb-6">
            Why Customers Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTruck className="text-accent-600" size={24} />
            </div>
            <h3 className="text-xl font-medium text-black mb-3">Reliable Transport</h3>
            <p className="text-black">
              Modern, comfortable vehicles with professional drivers
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiClock className="text-accent-600" size={24} />
            </div>
            <h3 className="text-xl font-medium text-black mb-3">Punctual Service</h3>
            <p className="text-black">
              Always on time with consistent daily departures
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTarget className="text-accent-600" size={24} />
            </div>
            <h3 className="text-xl font-medium text-black mb-3">Expert Guidance</h3>
            <p className="text-black">
              Professional assistance throughout the border crossing process
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
