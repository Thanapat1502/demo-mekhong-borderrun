export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: 'journey' | 'destination' | 'service' | 'cultural';
  featured?: boolean;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-featured",
    src: "/image/home/commercial/commercial1.jpg",
    alt: "Professional border run service vehicle",
    title: "Professional Service",
    description: "Comfortable air-conditioned vehicles for your journey",
    category: "service",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "gallery-commercial-2",
    src: "/image/home/commercial/commercial2.jpg", 
    alt: "Border crossing experience",
    title: "Border Experience",
    description: "Smooth and efficient border crossing process",
    category: "journey",
    aspectRatio: "square",
  },
  {
    id: "gallery-commercial-4",
    src: "/image/home/commercial/commercial4.jpg",
    alt: "Cultural sites during the journey",
    title: "Cultural Highlights", 
    description: "Visit amazing cultural sites along the way",
    category: "cultural",
    aspectRatio: "square",
  },
  {
    id: "gallery-commercial-6",
    src: "/image/home/commercial/commercial6.jpg",
    alt: "Scenic views during border run",
    title: "Scenic Journey",
    description: "Beautiful landscapes throughout the trip",
    category: "destination",
    aspectRatio: "square",
  },
  {
    id: "gallery-commercial-8", 
    src: "/image/home/commercial/commercial8.jpg",
    alt: "Professional border run team",
    title: "Expert Guidance",
    description: "Experienced team to assist with all procedures",
    category: "service",
    aspectRatio: "square",
  },
  {
    id: "gallery-commercial-9",
    src: "/image/home/commercial/commercial9.JPG",
    alt: "Border crossing documentation",
    title: "Documentation Support",
    description: "Complete assistance with visa and border procedures",
    category: "service", 
    aspectRatio: "square",
  },
  {
    id: "gallery-commercial-10",
    src: "/image/home/commercial/commercial10.jpg",
    alt: "Return journey comfort",
    title: "Comfortable Return",
    description: "Relaxing journey back to Chiang Mai",
    category: "journey",
    aspectRatio: "square",
  },
];

// Get featured gallery images
export const getFeaturedGalleryImages = (): GalleryImage[] => {
  return galleryImages.filter(image => image.featured);
};

// Get gallery images by category
export const getGalleryImagesByCategory = (category: GalleryImage['category']): GalleryImage[] => {
  return galleryImages.filter(image => image.category === category);
};

// Get gallery image by ID
export const getGalleryImageById = (id: string): GalleryImage | undefined => {
  return galleryImages.find(image => image.id === id);
};

// Get gallery images for grid display (featured first, then others)
export const getGalleryImagesForDisplay = (): GalleryImage[] => {
  const featured = galleryImages.filter(image => image.featured);
  const others = galleryImages.filter(image => !image.featured);
  return [...featured, ...others];
};
