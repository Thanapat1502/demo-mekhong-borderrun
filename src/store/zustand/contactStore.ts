import { create } from "zustand";
import {
  contactInfoService,
  ownerInfoService,
  businessInfoService,
} from "@/services/supabaseService";

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

// Mock data - replace with API calls in production
const mockContactInfo: ContactInfo[] = [
  {
    id: "phone-primary",
    type: "phone",
    label: "Primary Phone",
    value: "+66 95 102 9528",
    isPrimary: true,
    isPublic: true,
    description: "Main contact number for bookings and inquiries",
  },
  {
    id: "email-primary",
    type: "email",
    label: "Primary Email",
    value: "mekongborderrun@gmail.com",
    isPrimary: true,
    isPublic: true,
    description: "Main email for bookings and support",
  },
  {
    id: "whatsapp-primary",
    type: "whatsapp",
    label: "WhatsApp",
    value: "+66 95 102 9528",
    isPrimary: false,
    isPublic: true,
    description: "Quick messaging and support",
  },
  {
    id: "line-primary",
    type: "line",
    label: "LINE Official",
    value: "@mekongborderrun",
    isPrimary: false,
    isPublic: true,
    description: "LINE official account for Thai customers",
  },
  {
    id: "address-office",
    type: "address",
    label: "Office Address",
    value: "Chiang Mai, Thailand",
    isPrimary: true,
    isPublic: true,
    description: "Main office location",
  },
];

const mockOwnerInfo: OwnerInfo = {
  id: "owner-1",
  name: "Mekong Border Run Team",
  title: "Licensed Border Run Operator",
  email: "mekongborderrun@gmail.com",
  phone: "+66 95 102 9528",
  whatsapp: "+66 95 102 9528",
  line: "@mekongborderrun",
  bio: "Professional visa extension service provider with years of experience in Thailand-Laos border crossings.",
  experience: "5+ years",
  languages: ["English", "Thai", "Basic Lao"],
  certifications: ["TAT Licensed Operator", "Tourism Business License"],
};

const mockBusinessInfo: BusinessInfo = {
  id: "business-1",
  businessName: "Mekong Border Run",
  tatLicense: "TAT-XXXX-XXXX",
  address: {
    street: "Chiang Mai",
    city: "Chiang Mai",
    province: "Chiang Mai",
    postalCode: "50000",
    country: "Thailand",
  },
  coordinates: {
    lat: 18.7883,
    lng: 98.9853,
  },
  operatingHours: {
    monday: { open: "08:00", close: "18:00", isOpen: true },
    tuesday: { open: "08:00", close: "18:00", isOpen: true },
    wednesday: { open: "08:00", close: "18:00", isOpen: true },
    thursday: { open: "08:00", close: "18:00", isOpen: true },
    friday: { open: "08:00", close: "18:00", isOpen: true },
    saturday: { open: "08:00", close: "18:00", isOpen: true },
    sunday: { open: "08:00", close: "18:00", isOpen: true },
  },
  socialMedia: {
    facebook: "https://facebook.com/mekongborderrun",
    instagram: "https://instagram.com/mekongborderrun",
  },
};

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
      const data = await contactInfoService.getPublic();

      // Transform database data to match interface
      const transformedData = data.map((item) => ({
        id: item.id,
        type: item.type,
        label: item.label,
        value: item.value,
        isPrimary: item.is_primary,
        isPublic: item.is_public,
        description: item.description,
      }));

      set({ contactInfo: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch contact info:", error);
      // Fallback to mock data
      set({
        contactInfo: mockContactInfo,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch contact info",
      });
    }
  },

  fetchOwnerInfo: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await ownerInfoService.get();
      set({ ownerInfo: data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch owner info:", error);
      // Fallback to mock data
      set({
        ownerInfo: mockOwnerInfo,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch owner info",
      });
    }
  },

  fetchBusinessInfo: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await businessInfoService.get();
      set({ businessInfo: data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch business info:", error);
      // Fallback to mock data
      set({
        businessInfo: mockBusinessInfo,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch business info",
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
