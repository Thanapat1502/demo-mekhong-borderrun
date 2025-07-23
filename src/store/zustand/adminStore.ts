import { create } from "zustand";
import {
  heroImagesService,
  journeyImagesService,
  pickupPointImagesService,
  galleryImagesService,
  customerReviewsService,
  servicePackagesService,
  contactInfoService,
  ownerInfoService,
  businessInfoService,
} from "@/services/supabaseService";

// Import types
import type {
  HeroImageRow,
  JourneyImageRow,
  PickupPointImageRow,
  GalleryImageRow,
  CustomerReviewRow,
  ServicePackageRow,
  ContactInfoRow,
  OwnerInfoRow,
  BusinessInfoRow,
} from "@/lib/supabase";

interface AdminState {
  // Loading states
  isLoading: boolean;
  error: string | null;

  // Success messages
  successMessage: string | null;

  // Hero Images Admin
  createHeroImage: (
    data: Omit<HeroImageRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateHeroImage: (
    id: string,
    data: Partial<Omit<HeroImageRow, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deleteHeroImage: (id: string) => Promise<void>;

  // Journey Images Admin
  createJourneyImage: (
    data: Omit<JourneyImageRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateJourneyImage: (
    id: string,
    data: Partial<Omit<JourneyImageRow, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deleteJourneyImage: (id: string) => Promise<void>;

  // Pickup Point Images Admin
  createPickupPoint: (
    data: Omit<PickupPointImageRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updatePickupPoint: (
    id: string,
    data: Partial<Omit<PickupPointImageRow, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deletePickupPoint: (id: string) => Promise<void>;

  // Gallery Images Admin
  createGalleryImage: (
    data: Omit<GalleryImageRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateGalleryImage: (
    id: string,
    data: Partial<Omit<GalleryImageRow, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;

  // Customer Reviews Admin
  createCustomerReview: (
    data: Omit<CustomerReviewRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateCustomerReview: (
    id: number,
    data: Partial<Omit<CustomerReviewRow, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deleteCustomerReview: (id: number) => Promise<void>;

  // Service Packages Admin
  createServicePackage: (
    data: Omit<ServicePackageRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateServicePackage: (
    id: string,
    data: Partial<Omit<ServicePackageRow, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deleteServicePackage: (id: string) => Promise<void>;

  // Contact Info Admin
  createContactInfo: (
    data: Omit<ContactInfoRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateContactInfo: (
    id: string,
    data: Partial<Omit<ContactInfoRow, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deleteContactInfo: (id: string) => Promise<void>;

  // Owner Info Admin
  updateOwnerInfo: (
    data: Omit<OwnerInfoRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;

  // Business Info Admin
  updateBusinessInfo: (
    data: Omit<BusinessInfoRow, "id" | "created_at" | "updated_at">
  ) => Promise<void>;

  // Utility functions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (message: string | null) => void;
  clearMessages: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  // Initial state
  isLoading: false,
  error: null,
  successMessage: null,

  // Hero Images Admin
  createHeroImage: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await heroImagesService.create(data);
      set({
        isLoading: false,
        successMessage: "Hero image created successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create hero image",
      });
    }
  },

  updateHeroImage: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await heroImagesService.update(id, data);
      set({
        isLoading: false,
        successMessage: "Hero image updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update hero image",
      });
    }
  },

  deleteHeroImage: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await heroImagesService.delete(id);
      set({
        isLoading: false,
        successMessage: "Hero image deleted successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete hero image",
      });
    }
  },

  // Journey Images Admin
  createJourneyImage: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await journeyImagesService.create(data);
      set({
        isLoading: false,
        successMessage: "Journey image created successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create journey image",
      });
    }
  },

  updateJourneyImage: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await journeyImagesService.update(id, data);
      set({
        isLoading: false,
        successMessage: "Journey image updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update journey image",
      });
    }
  },

  deleteJourneyImage: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await journeyImagesService.delete(id);
      set({
        isLoading: false,
        successMessage: "Journey image deleted successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete journey image",
      });
    }
  },

  // Pickup Point Images Admin
  createPickupPoint: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await pickupPointImagesService.create(data);
      set({
        isLoading: false,
        successMessage: "Pickup point created successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create pickup point",
      });
    }
  },

  updatePickupPoint: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await pickupPointImagesService.update(id, data);
      set({
        isLoading: false,
        successMessage: "Pickup point updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update pickup point",
      });
    }
  },

  deletePickupPoint: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await pickupPointImagesService.delete(id);
      set({
        isLoading: false,
        successMessage: "Pickup point deleted successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete pickup point",
      });
    }
  },

  // Gallery Images Admin
  createGalleryImage: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await galleryImagesService.create(data);
      set({
        isLoading: false,
        successMessage: "Gallery image created successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create gallery image",
      });
    }
  },

  updateGalleryImage: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await galleryImagesService.update(id, data);
      set({
        isLoading: false,
        successMessage: "Gallery image updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update gallery image",
      });
    }
  },

  deleteGalleryImage: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await galleryImagesService.delete(id);
      set({
        isLoading: false,
        successMessage: "Gallery image deleted successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete gallery image",
      });
    }
  },

  // Customer Reviews Admin
  createCustomerReview: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await customerReviewsService.create(data);
      set({
        isLoading: false,
        successMessage: "Customer review created successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create customer review",
      });
    }
  },

  updateCustomerReview: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await customerReviewsService.update(id, data);
      set({
        isLoading: false,
        successMessage: "Customer review updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update customer review",
      });
    }
  },

  deleteCustomerReview: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await customerReviewsService.delete(id);
      set({
        isLoading: false,
        successMessage: "Customer review deleted successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete customer review",
      });
    }
  },

  // Service Packages Admin
  createServicePackage: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await servicePackagesService.create(data);
      set({
        isLoading: false,
        successMessage: "Service package created successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create service package",
      });
    }
  },

  updateServicePackage: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await servicePackagesService.update(id, data);
      set({
        isLoading: false,
        successMessage: "Service package updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update service package",
      });
    }
  },

  deleteServicePackage: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await servicePackagesService.delete(id);
      set({
        isLoading: false,
        successMessage: "Service package deleted successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete service package",
      });
    }
  },

  // Contact Info Admin
  createContactInfo: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await contactInfoService.create(data);
      set({
        isLoading: false,
        successMessage: "Contact info created successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create contact info",
      });
    }
  },

  updateContactInfo: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await contactInfoService.update(id, data);
      set({
        isLoading: false,
        successMessage: "Contact info updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update contact info",
      });
    }
  },

  deleteContactInfo: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await contactInfoService.delete(id);
      set({
        isLoading: false,
        successMessage: "Contact info deleted successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete contact info",
      });
    }
  },

  // Owner Info Admin
  updateOwnerInfo: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await ownerInfoService.createOrUpdate(data);
      set({
        isLoading: false,
        successMessage: "Owner info updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update owner info",
      });
    }
  },

  // Business Info Admin
  updateBusinessInfo: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await businessInfoService.createOrUpdate(data);
      set({
        isLoading: false,
        successMessage: "Business info updated successfully!",
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update business info",
      });
    }
  },

  // Utility functions
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setSuccess: (message: string | null) => {
    set({ successMessage: message });
  },

  clearMessages: () => {
    set({ error: null, successMessage: null });
  },
}));
