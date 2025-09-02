import { create } from "zustand";
import customerReviewsData from "@/data/static/customer-reviews.json";

// Transform database row to display format
export interface Review {
  id: number;
  name: string;
  avatar: string;
  country: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean | null;
  trip_date: string | null;
  created_at: string;
  updated_at: string;
}

interface ReviewState {
  reviews: Review[];
  featuredReviews: Review[];
  highlight: Review | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchReviews: () => Promise<void>;
  fetchFeaturedReviews: () => Promise<void>;
  fetchHighlight: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// No fallback mock data - only use real data from Supabase

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  featuredReviews: [],
  highlight: null,
  isLoading: false,
  error: null,

  fetchReviews: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const transformedReviews: Review[] = customerReviewsData.map((item) => ({
        id: item.id,
        name: item.name,
        avatar: item.avatar,
        country: item.country,
        rating: item.rating,
        review: item.review,
        date: item.date,
        verified: true, // Default to verified for static data
        trip_date: item.date, // Use review date as trip date
        created_at: item.date,
        updated_at: item.date,
      }));

      set({
        reviews: transformedReviews,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load reviews:", error);
      set({
        reviews: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to load reviews",
      });
    }
  },

  fetchFeaturedReviews: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use first 6 reviews as featured from static data
      const featuredData = customerReviewsData.slice(0, 6);

      const transformedReviews: Review[] = featuredData.map((item) => ({
        id: item.id,
        name: item.name,
        avatar: item.avatar,
        country: item.country,
        rating: item.rating,
        review: item.review,
        date: item.date,
        verified: true, // Default to verified for static data
        trip_date: item.date, // Use review date as trip date
        created_at: item.date,
        updated_at: item.date,
      }));

      set({
        featuredReviews: transformedReviews,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load featured reviews:", error);
      set({
        featuredReviews: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load featured reviews",
      });
    }
  },

  fetchHighlight: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use first customer review as highlight from static data
      const highlightData = customerReviewsData[0];

      const transformedReview: Review = {
        id: highlightData.id,
        name: highlightData.name,
        avatar: highlightData.avatar,
        country: highlightData.country,
        rating: highlightData.rating,
        review: highlightData.review,
        date: highlightData.date,
        verified: true, // Default to verified for static data
        trip_date: highlightData.date, // Use review date as trip date
        created_at: highlightData.date,
        updated_at: highlightData.date,
      };

      set({
        highlight: transformedReview,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load highlight review:", error);
      set({
        highlight: null, // Fallback to null
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load highlight review",
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
