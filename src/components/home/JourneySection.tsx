import { FiTruck, FiMapPin, FiCheckCircle, FiArrowRight } from "react-icons/fi";

export default function JourneySection() {
  const journeySteps = [
    {
      time: "09:30",
      title: "Departure",
      desc: "Comfortable pickup from your location in Chiang Mai",
      icon: FiTruck,
    },
    {
      time: "12:30",
      title: "Cultural Stop",
      desc: "Lunch and visit to the magnificent White Temple in Chiang Rai",
      icon: FiMapPin,
    },
    {
      time: "15:30",
      title: "Border Crossing",
      desc: "Arrive at Chiang Khong and cross to Huay Xai, Laos",
      icon: FiArrowRight,
    },
    {
      time: "16:00",
      title: "Return Journey",
      desc: "Begin comfortable return to Chiang Mai with new entry stamp",
      icon: FiCheckCircle,
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-black mb-6">Your Journey</h2>
          <p className="text-lg text-black">
            A carefully planned day trip designed for your comfort
          </p>
        </div>

        <div className="space-y-12">
          {journeySteps.map((step, index) => (
            <div key={index} className="flex items-start gap-8 group">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon size={24} />
                </div>
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-light text-accent-600">
                    {step.time}
                  </span>
                  <div className="h-px bg-accent-200 flex-1"></div>
                </div>
                <h3 className="text-xl font-medium text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-black leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
