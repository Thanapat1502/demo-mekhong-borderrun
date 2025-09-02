import { create } from "zustand";

// Import static data
import heroImagesData from "@/data/static/hero-images.json";
import journeyImagesData from "@/data/static/journey-images.json";
import pickupPointImagesData from "@/data/static/pickup-points.json";
import galleryImagesData from "@/data/static/gallery-images.json";
import customerReviewsData from "@/data/static/customer-reviews.json";

// Static data implementation - no API calls needed

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
  google_map_url?: string;
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
  isLoading: boolean;
  error: string | null;
  fetchPickupPointImages: () => Promise<void>;
  fetchJourneyImages: () => Promise<void>;
  fetchGalleryImages: () => Promise<void>;
  fetchHeroImages: () => Promise<void>;
  fetchCustomerReviews: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useContentStore = create<State>((set) => ({
  pickupPointImages: [],
  journeyImages: [],
  galleryImages: [],
  heroImages: [],
  customerReviews: [],
  isLoading: false,
  error: null,

  fetchPickupPointImages: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const transformedData = pickupPointImagesData.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        title: item.title,
        location: item.location,
        description: item.description,
        google_map_url: item.google_map_url,
        landmark: item.landmark,
        coordinates: item.coordinates,
      }));

      set({ pickupPointImages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to load pickup point images:", error);
      set({
        pickupPointImages: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load pickup point images",
      });
    }
  },

  fetchJourneyImages: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const transformedData = journeyImagesData.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        step: item.step,
        title: item.title,
        description: item.description,
        time: item.time,
      }));

      set({ journeyImages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to load journey images:", error);
      set({
        journeyImages: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load journey images",
      });
    }
  },

  fetchGalleryImages: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const transformedData = galleryImagesData.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        title: item.title,
        description: item.description,
        category: item.category,
        featured: item.featured,
        aspectRatio: item.aspectRatio,
      }));

      set({ galleryImages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to load gallery images:", error);
      set({
        galleryImages: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load gallery images",
      });
    }
  },

  fetchHeroImages: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const transformedData = heroImagesData.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        title: item.title,
        description: item.description,
        priority: item.priority,
      }));
      set({ heroImages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to load hero images:", error);
      set({
        heroImages: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to load hero images",
      });
    }
  },

  fetchCustomerReviews: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const transformedData = customerReviewsData.map((item) => ({
        id: item.id,
        name: item.name,
        country: item.country,
        avatar: item.avatar,
        rating: item.rating,
        review: item.review,
        date: item.date,
      }));

      set({ customerReviews: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to load customer reviews:", error);
      set({
        customerReviews: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load customer reviews",
      });
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
