import { FiUsers, FiCheckCircle, FiStar, FiCalendar } from "react-icons/fi";

export default function CustomerStats() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-accent-500 mb-4 flex justify-center">
              <FiUsers size={32} />
            </div>
            <div className="text-4xl font-light text-accent-600 mb-2">500+</div>
            <div className="text-black">Happy Customers</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-accent-500 mb-4 flex justify-center">
              <FiCheckCircle size={32} />
            </div>
            <div className="text-4xl font-light text-accent-600 mb-2">100%</div>
            <div className="text-black">Success Rate</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-accent-500 mb-4 flex justify-center">
              <FiStar size={32} />
            </div>
            <div className="text-4xl font-light text-accent-600 mb-2">5★</div>
            <div className="text-black">Average Rating</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-accent-500 mb-4 flex justify-center">
              <FiCalendar size={32} />
            </div>
            <div className="text-4xl font-light text-accent-600 mb-2">2+</div>
            <div className="text-black">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
