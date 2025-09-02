import { create } from "zustand";
import contactInfoData from "@/data/static/contact-info.json";
import ownerInfoData from "@/data/static/owner-info.json";
import businessInfoData from "@/data/static/business-info.json";

export interface ContactInfo {
  id: string;
  type: "phone" | "email" | "whatsapp" | "line" | "address" | "website";
  label: string;
  value: string;
  isPrimary?: boolean;
  isPublic?: boolean;
  description?: string;
}

export interface OwnerInfo {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp?: string;
  line?: string;
  address?: string;
  avatar?: string;
  bio?: string;
  experience?: string;
  languages?: string[];
  certifications?: string[];
}

export interface BusinessInfo {
  id: string;
  businessName: string;
  registrationNumber?: string;
  tatLicense?: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

interface ContactState {
  // State
  contactInfo: ContactInfo[];
  ownerInfo: OwnerInfo | null;
  businessInfo: BusinessInfo | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchContactInfo: () => Promise<void>;
  fetchOwnerInfo: () => Promise<void>;
  fetchBusinessInfo: () => Promise<void>;
  updateContactInfo: (contactId: string, updates: Partial<ContactInfo>) => void;
  updateOwnerInfo: (updates: Partial<OwnerInfo>) => void;
  updateBusinessInfo: (updates: Partial<BusinessInfo>) => void;
  addContactInfo: (newContact: Omit<ContactInfo, "id">) => void;
  removeContactInfo: (contactId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// No fallback mock data - only use real data from Supabase

export const useContactStore = create<ContactState>((set, get) => ({
  // Initial state
  contactInfo: [],
  ownerInfo: null,
  businessInfo: null,
  isLoading: false,
  error: null,

  // Actions
  fetchContactInfo: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly and filter for public contacts
      const transformedData = contactInfoData
        .filter((item) => item.is_public)
        .map((item) => ({
          id: item.id,
          type: item.type as ContactInfo["type"],
          label: item.label,
          value: item.value,
          isPrimary: item.is_primary,
          isPublic: item.is_public,
          description: undefined, // Not in static data
        }));

      set({ contactInfo: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to load contact info:", error);
      set({
        contactInfo: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load contact info",
      });
    }
  },

  fetchOwnerInfo: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Transform static data to match interface
      const transformedOwnerInfo: OwnerInfo = {
        id: ownerInfoData.id,
        name: ownerInfoData.owner_name,
        title: "Owner & Tour Guide", // Default title
        email: "info@mekong-borderrun.com", // Default from web config
        phone: "+66 123 456 789", // Default from web config
        whatsapp: "+66 987 654 321", // From contact info
        line: "@mekongborderrun", // From contact info
        address:
          "123 Chang Khlan Road, Mueang Chiang Mai District, Chiang Mai 50100, Thailand",
        avatar: ownerInfoData.owner_photo,
        bio: ownerInfoData.owner_bio,
        experience: ownerInfoData.owner_experience,
        languages: ownerInfoData.owner_languages,
        certifications: ownerInfoData.owner_certifications,
      };

      set({ ownerInfo: transformedOwnerInfo, isLoading: false });
    } catch (error) {
      console.error("Failed to load owner info:", error);
      set({
        ownerInfo: null, // Fallback to null
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to load owner info",
      });
    }
  },

  fetchBusinessInfo: async () => {
    try {
      set({ isLoading: true, error: null });

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Transform static data to match interface
      const transformedBusinessInfo: BusinessInfo = {
        id: businessInfoData.id,
        businessName: businessInfoData.business_name,
        registrationNumber: businessInfoData.tax_id,
        tatLicense: businessInfoData.license_number,
        address: {
          street: "123 Chang Khlan Road",
          city: "Chiang Mai",
          province: "Chiang Mai",
          postalCode: "50100",
          country: "Thailand",
        },
        coordinates: {
          lat: 18.7883,
          lng: 98.9853,
        },
        operatingHours: {
          monday: { open: "09:00", close: "18:00", isOpen: true },
          tuesday: { open: "09:00", close: "18:00", isOpen: true },
          wednesday: { open: "09:00", close: "18:00", isOpen: true },
          thursday: { open: "09:00", close: "18:00", isOpen: true },
          friday: { open: "09:00", close: "18:00", isOpen: true },
          saturday: { open: "09:00", close: "18:00", isOpen: true },
          sunday: { open: "09:00", close: "18:00", isOpen: true },
        },
        socialMedia: {
          facebook: "https://facebook.com/mekongborderrun",
          instagram: "https://instagram.com/mekongborderrun",
        },
      };

      set({ businessInfo: transformedBusinessInfo, isLoading: false });
    } catch (error) {
      console.error("Failed to load business info:", error);
      set({
        businessInfo: null, // Fallback to null
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load business info",
      });
    }
  },

  updateContactInfo: (contactId: string, updates: Partial<ContactInfo>) => {
    const { contactInfo } = get();
    const updatedContacts = contactInfo.map((contact) =>
      contact.id === contactId ? { ...contact, ...updates } : contact
    );
    set({ contactInfo: updatedContacts });
  },

  updateOwnerInfo: (updates: Partial<OwnerInfo>) => {
    const { ownerInfo } = get();
    if (ownerInfo) {
      set({ ownerInfo: { ...ownerInfo, ...updates } });
    }
  },

  updateBusinessInfo: (updates: Partial<BusinessInfo>) => {
    const { businessInfo } = get();
    if (businessInfo) {
      set({ businessInfo: { ...businessInfo, ...updates } });
    }
  },

  addContactInfo: (newContact: Omit<ContactInfo, "id">) => {
    const { contactInfo } = get();
    const contactWithId: ContactInfo = {
      ...newContact,
      id: `contact-${Date.now()}`,
    };
    set({ contactInfo: [...contactInfo, contactWithId] });
  },

  removeContactInfo: (contactId: string) => {
    const { contactInfo } = get();
    const filteredContacts = contactInfo.filter(
      (contact) => contact.id !== contactId
    );
    set({ contactInfo: filteredContacts });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

// Helper functions
export const getPrimaryContact = (
  contacts: ContactInfo[],
  type: ContactInfo["type"]
): ContactInfo | undefined => {
  return contacts.find((contact) => contact.type === type && contact.isPrimary);
};

export const getPublicContacts = (contacts: ContactInfo[]): ContactInfo[] => {
  return contacts.filter((contact) => contact.isPublic);
};

export const getContactsByType = (
  contacts: ContactInfo[],
  type: ContactInfo["type"]
): ContactInfo[] => {
  return contacts.filter((contact) => contact.type === type);
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Format Thai phone numbers
  if (cleaned.startsWith("+66")) {
    const number = cleaned.slice(3);
    if (number.length === 9) {
      return `+66 ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(
        5
      )}`;
    }
  }

  return phone;
};
