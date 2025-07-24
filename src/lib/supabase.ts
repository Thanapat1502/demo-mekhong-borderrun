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
  CONTACT_INFO: "contact_info",
  OWNER_INFO: "owner_info",
  BUSINESS_INFO: "business_info",
  CONTACT_REQUESTS: "contact_requests",
  WEBSITE_ANALYTICS: "website_analytics",
  WEB_CONFIG: "web_config",
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
          google_map_url?: string | null;
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
          google_map_url?: string | null;
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
          google_map_url?: string | null;
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
      contact_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          service_type: string | null;
          preferred_date: string | null;
          number_of_people: number | null;
          status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          service_type?: string | null;
          preferred_date?: string | null;
          number_of_people?: number | null;
          status?:
            | "new"
            | "contacted"
            | "confirmed"
            | "completed"
            | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          service_type?: string | null;
          preferred_date?: string | null;
          number_of_people?: number | null;
          status?:
            | "new"
            | "contacted"
            | "confirmed"
            | "completed"
            | "cancelled";
          updated_at?: string;
        };
      };
      website_analytics: {
        Row: {
          id: string;
          date: string;
          page_views: number;
          unique_visitors: number;
          contact_form_submissions: number;
          booking_inquiries: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          page_views?: number;
          unique_visitors?: number;
          contact_form_submissions?: number;
          booking_inquiries?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          page_views?: number;
          unique_visitors?: number;
          contact_form_submissions?: number;
          booking_inquiries?: number;
          updated_at?: string;
        };
      };
      web_config: {
        Row: {
          id: string;
          key: string;
          value: string;
          description?: string;
          category: string;
          type: string;
          is_required: boolean;
          is_public: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          description?: string;
          category?: string;
          type?: string;
          is_required?: boolean;
          is_public?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          description?: string;
          category?: string;
          type?: string;
          is_required?: boolean;
          is_public?: boolean;
          display_order?: number;
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
export type ContactRequestRow =
  Database["public"]["Tables"]["contact_requests"]["Row"];
export type WebsiteAnalyticsRow =
  Database["public"]["Tables"]["website_analytics"]["Row"];
export type WebConfigRow = Database["public"]["Tables"]["web_config"]["Row"];
