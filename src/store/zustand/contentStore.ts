import { create } from "zustand";
import {
  heroImagesService,
  journeyImagesService,
  pickupPointImagesService,
  galleryImagesService,
  customerReviewsService,
} from "@/services/supabaseService";

// No fallback data - only use real data from Supabase

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
      const data = await pickupPointImagesService.getAll();

      // Transform database data to match interface
      const transformedData = data.map((item) => ({
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
      console.error("Failed to fetch pickup point images:", error);
      set({
        pickupPointImages: [], // No fallback - empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch pickup point images",
      });
    }
  },

  fetchJourneyImages: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await journeyImagesService.getAll();

      // Transform database data to match interface
      const transformedData = data.map((item) => ({
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
      console.error("Failed to fetch journey images:", error);
      set({
        journeyImages: [], // No fallback - empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch journey images",
      });
    }
  },

  fetchGalleryImages: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await galleryImagesService.getAll();

      // Transform database data to match interface
      const transformedData = data.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        title: item.title,
        description: item.description,
        category: item.category,
        featured: item.featured,
        aspectRatio: item.aspect_ratio,
      }));

      set({ galleryImages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
      set({
        galleryImages: [], // No fallback - empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch gallery images",
      });
    }
  },

  fetchHeroImages: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await heroImagesService.getAll();

      // Transform database data to match interface
      const transformedData = data.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        title: item.title,
        description: item.description,
        priority: item.priority,
      }));
      set({ heroImages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch hero images:", error);
      set({
        heroImages: [], // No fallback - empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch hero images",
      });
    }
  },

  fetchCustomerReviews: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await customerReviewsService.getAll();

      // Transform database data to match interface
      const transformedData = data.map((item) => ({
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
      console.error("Failed to fetch customer reviews:", error);
      set({
        customerReviews: [], // No fallback - empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch customer reviews",
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
