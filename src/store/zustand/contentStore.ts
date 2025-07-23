import { create } from "zustand";
import { galleryImages as commercial } from "@/data/images/gallery";
import { journeyImages as journey } from "@/data/images/journeyImage";
import { pickupPointImages as pickup } from "@/data/images/pickupPointImage";
import { heroImages as banner } from "@/data/images/heroImage";
import { customerReviews as reviews } from "@/data/images/userReview";

interface HeroImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  priority?: boolean;
}
interface PickupPointImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  description: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
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
interface CustomerReviews {
  id: number;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}

type State = {
  pickupPointImages: PickupPointImage[];
  journeyImages: JourneyImage[];
  galleryImages: GalleryImage[];
  heroImages: HeroImage[];
  customerReviews: CustomerReviews[];
  fetchPickupPointImages: () => void;
  fetchJourneyImages: () => void;
  fetchGalleryImages: () => void;
  fetchHeroImages: () => void;
  fetchCustomerReviews: () => void;
};

export const useContentStore = create<State>((set) => ({
  pickupPointImages: [],
  journeyImages: [],
  galleryImages: [],
  heroImages: [],
  customerReviews: [],
  fetchPickupPointImages: () => {
    set({ pickupPointImages: pickup });
  },
  fetchJourneyImages: () => {
    set({ journeyImages: journey });
  },
  fetchGalleryImages: () => {
    set({ galleryImages: commercial });
  },
  fetchHeroImages: () => {
    set({ heroImages: banner });
  },
  fetchCustomerReviews: () => {
    set({ customerReviews: reviews });
  },
}));
