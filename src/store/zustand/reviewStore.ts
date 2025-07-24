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

// Fallback mock data for when Supabase is not available
const mockReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/image/avatars/sarah.jpg",
    country: "Bangkok, Thailand",
    rating: 5,
    review:
      "Excellent service! The border run was smooth and professional. Highly recommend for anyone needing visa extension.",
    date: "2024-01-15",
    verified: true,
    trip_date: "2024-01-15",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "/image/avatars/mike.jpg",
    country: "Chiang Mai, Thailand",
    rating: 5,
    review:
      "Great experience with the team. Very punctual and the White Temple visit was a nice bonus!",
    date: "2024-01-10",
    verified: true,
    trip_date: "2024-01-10",
    created_at: "2024-01-10T14:30:00Z",
    updated_at: "2024-01-10T14:30:00Z",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/image/avatars/emma.jpg",
    country: "Phuket, Thailand",
    rating: 4,
    review:
      "Professional service and comfortable transportation. The process was explained clearly.",
    date: "2024-01-08",
    verified: true,
    trip_date: "2024-01-08",
    created_at: "2024-01-08T09:15:00Z",
    updated_at: "2024-01-08T09:15:00Z",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/image/avatars/default.jpg",
    country: "Seoul, South Korea",
    rating: 5,
    review:
      "Amazing service! Everything went smoothly and the staff was very helpful throughout the journey.",
    date: "2024-01-05",
    verified: true,
    trip_date: "2024-01-05",
    created_at: "2024-01-05T16:45:00Z",
    updated_at: "2024-01-05T16:45:00Z",
  },
];

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
      // Fallback to mock data
      set({
        reviews: mockReviews,
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
      // Fallback to mock featured reviews (take first 3)
      const featuredMockReviews = mockReviews.slice(0, 3);
      set({
        featuredReviews: featuredMockReviews,
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
      // Fallback to first mock review
      const highlightMockReview = mockReviews[0];
      set({
        highlight: highlightMockReview,
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
