export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  priority?: boolean;
}

export const heroImages: HeroImage[] = [
  {
    id: "hero-1",
    src: "/image/home/other3.jpg",
    alt: "Mekong Border Run - Professional visa run service",
    title: "Professional Border Run Service",
    description: "Comfortable and reliable visa extension service",
    priority: true,
  },
  {
    id: "hero-2",
    src: "/image/home/other2.jpg",
    alt: "Chiang Mai to Laos border crossing",
    title: "Chiang Mai to Laos",
    description: "Daily departures to Huay Xai border",
  },
  {
    id: "hero-3",
    src: "/image/home/other1.jpg",
    alt: "White Temple visit during border run",
    title: "Cultural Experience",
    description: "Visit the famous White Temple in Chiang Rai",
  },
];

// Default hero image for main display
export const defaultHeroImage = heroImages[0];

// Get hero image by ID
export const getHeroImageById = (id: string): HeroImage | undefined => {
  return heroImages.find((image) => image.id === id);
};

// Get random hero image
export const getRandomHeroImage = (): HeroImage => {
  const randomIndex = Math.floor(Math.random() * heroImages.length);
  return heroImages[randomIndex];
};
