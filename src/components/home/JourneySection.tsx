import Image from "next/image";

interface JourneyImage {
  id: string;
  src: string;
  alt: string;
  step: string;
  title: string;
  description: string;
  time: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: "journey" | "destination" | "service" | "cultural";
  featured?: boolean;
  aspectRatio?: "square" | "landscape" | "portrait";
}

interface JourneySectionProps {
  journeyImages?: JourneyImage[];
  galleryImages?: GalleryImage[];
}

export default function JourneySection({
  journeyImages = [],
  galleryImages = [],
}: JourneySectionProps) {
  // Sort journey images by step
  const journeySteps = journeyImages.sort((a, b) =>
    a.step.localeCompare(b.step)
  );

  // Use gallery images for display (featured first)
  const galleryImagesData = galleryImages.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section className="py-8 md:py-14 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-3">
            Your Journey
          </h2>
          <div className="w-12 h-px bg-accent-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Timeline Section - Left Side */}
          <div className="lg:col-span-2">
            {/* Minimalist Timeline with Images */}
            <div className="space-y-0">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < journeySteps.length - 1 && (
                    <div className="absolute left-7 top-14 w-px h-16 bg-gray-200"></div>
                  )}

                  <div className="flex items-start gap-8 pb-12">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-baseline gap-4 mb-3">
                        <span className="text-lg font-mono font-semibold text-white bg-accent-600 px-3 py-1.5 rounded-md shadow-sm">
                          {step.time}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {step.description}
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
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-3">
                {galleryImagesData.map((imageData, index) => (
                  <div
                    key={imageData.id}
                    className={`relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer ${
                      imageData.featured || index === 0
                        ? "col-span-2 aspect-[4/3]"
                        : "aspect-square"
                    }`}>
                    <Image
                      src={imageData.src}
                      alt={imageData.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Image Number */}
                    <div className="absolute top-2 left-2 w-7 h-7 bg-white/95 rounded-full flex items-center justify-center text-base font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>

                    {/* Image Title on Hover */}
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/80 text-white px-3 py-1.5 rounded-md text-base font-medium">
                        {imageData.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer - Moved to Bottom */}
        <div className="text-center mt-8 pt-8 border-t border-gray-100">
          <p className="text-base text-gray-500 mb-4">
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
