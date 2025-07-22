export default function JourneySection() {
  const journeySteps = [
    {
      time: "09:30",
      title: "Departure",
      desc: "Professional pickup from your accommodation in Chiang Mai",
      step: "01",
    },
    {
      time: "12:30",
      title: "Cultural Stop",
      desc: "Lunch and visit to the magnificent White Temple in Chiang Rai",
      step: "02",
    },
    {
      time: "15:30",
      title: "Border Crossing",
      desc: "Arrive at Chiang Khong and cross to Huay Xai, Laos",
      step: "03",
    },
    {
      time: "16:00",
      title: "Return Journey",
      desc: "Begin comfortable return to Chiang Mai with new entry stamp",
      step: "04",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Minimalist Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-3">
            Your Journey
          </h2>
          <div className="w-12 h-px bg-accent-500 mx-auto"></div>
        </div>

        {/* Minimalist Timeline */}
        <div className="space-y-0">
          {journeySteps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < journeySteps.length - 1 && (
                <div className="absolute left-6 top-12 w-px h-16 bg-gray-200"></div>
              )}

              <div className="flex items-start gap-8 pb-12">
                {/* Step Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-sm font-mono text-accent-600 bg-accent-50 px-2 py-1 rounded">
                      {step.time}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">
            Professional • Licensed • Daily Departures
          </p>
          <div className="text-accent-600 font-medium">
            One day. Complete service.
          </div>
        </div>
      </div>
    </section>
  );
}
