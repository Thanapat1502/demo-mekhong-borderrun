import { create } from "zustand";
import { customerReviewsService } from "@/services/supabaseService";
import type { CustomerReviewRow } from "@/lib/supabase";

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

      const data = await customerReviewsService.getAll();

      const transformedReviews: Review[] = data.map(
        (item: CustomerReviewRow) => ({
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          country: item.country,
          rating: item.rating,
          review: item.review,
          date: item.date,
          verified: item.verified,
          trip_date: item.trip_date,
          created_at: item.created_at,
          updated_at: item.updated_at,
        })
      );

      set({
        reviews: transformedReviews,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      set({
        reviews: [], // No fallback - empty array
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch reviews",
      });
    }
  },

  fetchFeaturedReviews: async () => {
    try {
      set({ isLoading: true, error: null });

      const data = await customerReviewsService.getFeatured();

      const transformedReviews: Review[] = data.map(
        (item: CustomerReviewRow) => ({
          id: item.id,
          name: item.name,
          avatar: item.avatar,
          country: item.country,
          rating: item.rating,
          review: item.review,
          date: item.date,
          verified: item.verified,
          trip_date: item.trip_date,
          created_at: item.created_at,
          updated_at: item.updated_at,
        })
      );

      set({
        featuredReviews: transformedReviews,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch featured reviews:", error);
      set({
        featuredReviews: [], // No fallback - empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch featured reviews",
      });
    }
  },

  fetchHighlight: async () => {
    try {
      // Fetch the first customer from Supabase
      set({ isLoading: true, error: null });

      const data = await customerReviewsService.getHighlight();

      const transformedReview: Review = {
        id: data.id,
        name: data.name,
        avatar: data.avatar,
        country: data.country,
        rating: data.rating,
        review: data.review,
        date: data.date,
        verified: data.verified,
        trip_date: data.trip_date,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      set({
        highlight: transformedReview,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch highlight review:", error);
      set({
        highlight: null, // No fallback - null
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch highlight review",
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
