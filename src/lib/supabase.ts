import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client with fallback for build time
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient("https://placeholder.supabase.co", "placeholder-key");

// Database table names
export const TABLES = {
  HERO_IMAGES: "hero_images",
  JOURNEY_IMAGES: "journey_images",
  PICKUP_POINT_IMAGES: "pickup_point_images",
  GALLERY_IMAGES: "gallery_images",
  CUSTOMER_REVIEWS: "customer_reviews",
  SERVICE_PACKAGES: "service_packages",
  PRICING_TIERS: "pricing_tiers",
  CONTACT_INFO: "contact_info",
  OWNER_INFO: "owner_info",
  BUSINESS_INFO: "business_info",
} as const;

// Database types (these should match your Supabase schema)
export interface Database {
  public: {
    Tables: {
      hero_images: {
        Row: {
          id: string;
          src: string;
          alt: string;
          title: string | null;
          description: string | null;
          priority: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          src: string;
          alt: string;
          title?: string | null;
          description?: string | null;
          priority?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          src?: string;
          alt?: string;
          title?: string | null;
          description?: string | null;
          priority?: boolean | null;
          updated_at?: string;
        };
      };
      journey_images: {
        Row: {
          id: string;
          src: string;
          alt: string;
          step: string;
          title: string;
          description: string;
          time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          src: string;
          alt: string;
          step: string;
          title: string;
          description: string;
          time: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          src?: string;
          alt?: string;
          step?: string;
          title?: string;
          description?: string;
          time?: string;
          updated_at?: string;
        };
      };
      pickup_point_images: {
        Row: {
          id: string;
          src: string;
          alt: string;
          title: string;
          location: string;
          description: string;
          landmark: string | null;
          coordinates: { lat: number; lng: number } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          src: string;
          alt: string;
          title: string;
          location: string;
          description: string;
          landmark?: string | null;
          coordinates?: { lat: number; lng: number } | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          src?: string;
          alt?: string;
          title?: string;
          location?: string;
          description?: string;
          landmark?: string | null;
          coordinates?: { lat: number; lng: number } | null;
          updated_at?: string;
        };
      };
      gallery_images: {
        Row: {
          id: string;
          src: string;
          alt: string;
          title: string;
          description: string;
          category: "journey" | "destination" | "service" | "cultural";
          featured: boolean | null;
          aspect_ratio: "square" | "landscape" | "portrait" | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          src: string;
          alt: string;
          title: string;
          description: string;
          category: "journey" | "destination" | "service" | "cultural";
          featured?: boolean | null;
          aspect_ratio?: "square" | "landscape" | "portrait" | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          src?: string;
          alt?: string;
          title?: string;
          description?: string;
          category?: "journey" | "destination" | "service" | "cultural";
          featured?: boolean | null;
          aspect_ratio?: "square" | "landscape" | "portrait" | null;
          updated_at?: string;
        };
      };
      customer_reviews: {
        Row: {
          id: number;
          name: string;
          country: string;
          avatar: string;
          rating: number;
          review: string;
          date: string;
          verified: boolean | null;
          trip_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          country: string;
          avatar: string;
          rating: number;
          review: string;
          date: string;
          verified?: boolean | null;
          trip_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          country?: string;
          avatar?: string;
          rating?: number;
          review?: string;
          date?: string;
          verified?: boolean | null;
          trip_date?: string | null;
          updated_at?: string;
        };
      };
      service_packages: {
        Row: {
          id: string;
          name: string;
          price: number;
          currency: string;
          description: string;
          features: string[];
          duration: string;
          max_passengers: number;
          is_popular: boolean | null;
          is_available: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          currency: string;
          description: string;
          features: string[];
          duration: string;
          max_passengers: number;
          is_popular?: boolean | null;
          is_available?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          currency?: string;
          description?: string;
          features?: string[];
          duration?: string;
          max_passengers?: number;
          is_popular?: boolean | null;
          is_available?: boolean | null;
          updated_at?: string;
        };
      };
      contact_info: {
        Row: {
          id: string;
          type: "phone" | "email" | "whatsapp" | "line" | "address" | "website";
          label: string;
          value: string;
          is_primary: boolean | null;
          is_public: boolean | null;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: "phone" | "email" | "whatsapp" | "line" | "address" | "website";
          label: string;
          value: string;
          is_primary?: boolean | null;
          is_public?: boolean | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?:
            | "phone"
            | "email"
            | "whatsapp"
            | "line"
            | "address"
            | "website";
          label?: string;
          value?: string;
          is_primary?: boolean | null;
          is_public?: boolean | null;
          description?: string | null;
          updated_at?: string;
        };
      };
      owner_info: {
        Row: {
          id: string;
          name: string;
          title: string;
          email: string;
          phone: string;
          whatsapp: string | null;
          line: string | null;
          avatar: string | null;
          bio: string | null;
          experience: string | null;
          languages: string[] | null;
          certifications: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          title: string;
          email: string;
          phone: string;
          whatsapp?: string | null;
          line?: string | null;
          avatar?: string | null;
          bio?: string | null;
          experience?: string | null;
          languages?: string[] | null;
          certifications?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          title?: string;
          email?: string;
          phone?: string;
          whatsapp?: string | null;
          line?: string | null;
          avatar?: string | null;
          bio?: string | null;
          experience?: string | null;
          languages?: string[] | null;
          certifications?: string[] | null;
          updated_at?: string;
        };
      };
      business_info: {
        Row: {
          id: string;
          business_name: string;
          registration_number: string | null;
          tat_license: string | null;
          address: {
            street: string;
            city: string;
            province: string;
            postalCode: string;
            country: string;
          };
          coordinates: { lat: number; lng: number } | null;
          operating_hours: {
            [key: string]: { open: string; close: string; isOpen: boolean };
          };
          social_media: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
            youtube?: string;
          } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          registration_number?: string | null;
          tat_license?: string | null;
          address: {
            street: string;
            city: string;
            province: string;
            postalCode: string;
            country: string;
          };
          coordinates?: { lat: number; lng: number } | null;
          operating_hours: {
            [key: string]: { open: string; close: string; isOpen: boolean };
          };
          social_media?: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
            youtube?: string;
          } | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_name?: string;
          registration_number?: string | null;
          tat_license?: string | null;
          address?: {
            street: string;
            city: string;
            province: string;
            postalCode: string;
            country: string;
          };
          coordinates?: { lat: number; lng: number } | null;
          operating_hours?: {
            [key: string]: { open: string; close: string; isOpen: boolean };
          };
          social_media?: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
            youtube?: string;
          } | null;
          updated_at?: string;
        };
      };
    };
  };
}

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: unknown) => {
  console.error("Supabase error:", error);
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return "An unexpected error occurred";
};

// Type aliases for database row types
export type HeroImageRow = Database["public"]["Tables"]["hero_images"]["Row"];
export type JourneyImageRow =
  Database["public"]["Tables"]["journey_images"]["Row"];
export type PickupPointImageRow =
  Database["public"]["Tables"]["pickup_point_images"]["Row"];
export type GalleryImageRow =
  Database["public"]["Tables"]["gallery_images"]["Row"];
export type CustomerReviewRow =
  Database["public"]["Tables"]["customer_reviews"]["Row"];
export type ServicePackageRow =
  Database["public"]["Tables"]["service_packages"]["Row"];
export type ContactInfoRow =
  Database["public"]["Tables"]["contact_info"]["Row"];
export type OwnerInfoRow = Database["public"]["Tables"]["owner_info"]["Row"];
export type BusinessInfoRow =
  Database["public"]["Tables"]["business_info"]["Row"];
