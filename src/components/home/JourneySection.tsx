import Image from "next/image";

export default function JourneySection() {
  const journeySteps = [
    {
      time: "09:30",
      title: "Departure",
      desc: "Professional pickup from your accommodation in Chiang Mai",
      step: "01",
      image: "/image/home/commercial/commercial1.jpg",
    },
    {
      time: "12:30",
      title: "Cultural Stop",
      desc: "Lunch and visit to the magnificent White Temple in Chiang Rai",
      step: "02",
      image: "/image/home/commercial/commercial3.jpg",
    },
    {
      time: "15:30",
      title: "Border Crossing",
      desc: "Arrive at Chiang Khong and cross to Huay Xai, Laos",
      step: "03",
      image: "/image/home/commercial/commercial5.jpg",
    },
    {
      time: "16:00",
      title: "Return Journey",
      desc: "Begin comfortable return to Chiang Mai with new entry stamp",
      step: "04",
      image: "/image/home/commercial/commercial7.jpeg",
    },
  ];

  // Image collection for the gallery
  const galleryImages = [
    "/image/home/commercial/commercial1.jpg",
    "/image/home/commercial/commercial2.jpg",
    "/image/home/commercial/commercial4.jpg",
    "/image/home/commercial/commercial6.jpg",
    "/image/home/commercial/commercial8.jpg",
    "/image/home/commercial/commercial9.JPG",
    "/image/home/commercial/commercial10.jpg",
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-3">
            Your Journey
          </h2>
          <div className="w-12 h-px bg-accent-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Timeline Section - Left Side */}
          <div className="lg:col-span-2">
            {/* Minimalist Timeline with Images */}
            <div className="space-y-0">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < journeySteps.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-20 bg-gray-200"></div>
                  )}

                  <div className="flex items-start gap-8 pb-16">
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
                      <p className="text-gray-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">
                Experience Gallery
              </h3>

              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-3">
                {galleryImages.map((imageSrc, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer ${
                      index === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"
                    }`}>
                    <Image
                      src={imageSrc}
                      alt={`Journey experience ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Number */}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer - Moved to Bottom */}
        <div className="text-center mt-16 pt-8 border-t border-gray-100">
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
