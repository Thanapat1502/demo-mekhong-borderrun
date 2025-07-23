import { create } from "zustand";
import { servicePackagesService } from "@/services/supabaseService";

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  duration: string;
  maxPassengers: number;
  isPopular?: boolean;
  isAvailable?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  basePrice: number;
  currency: string;
  description: string;
  features: string[];
  limitations?: string[];
}

interface PackageState {
  // State
  packages: ServicePackage[];
  pricingTiers: PricingTier[];
  currentPrice: number;
  currency: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchPackages: () => Promise<void>;
  fetchPricingTiers: () => Promise<void>;
  fetchCurrentPrice: () => Promise<void>;
  updatePrice: (newPrice: number) => void;
  updatePackage: (packageId: string, updates: Partial<ServicePackage>) => void;
  addPackage: (newPackage: Omit<ServicePackage, "id">) => void;
  removePackage: (packageId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Mock data - replace with API calls in production
const mockPackages: ServicePackage[] = [
  {
    id: "border-run-standard",
    name: "Standard Border Run",
    price: 4200,
    currency: "THB",
    description: "Complete visa extension service with cultural experience",
    features: [
      "Professional pickup from your location",
      "Air-conditioned vehicle",
      "White Temple visit in Chiang Rai",
      "Lunch included",
      "Border crossing assistance",
      "Return to Chiang Mai",
      "Licensed TAT operator",
    ],
    duration: "Full Day (8-9 hours)",
    maxPassengers: 8,
    isPopular: true,
    isAvailable: true,
  },
  {
    id: "border-run-premium",
    name: "Premium Border Run",
    price: 5500,
    currency: "THB",
    description: "Enhanced service with additional comfort and flexibility",
    features: [
      "All Standard features",
      "Private vehicle option",
      "Flexible pickup time",
      "Premium lunch",
      "Personal border assistant",
      "Photo service at White Temple",
      "Refreshments during journey",
    ],
    duration: "Full Day (8-9 hours)",
    maxPassengers: 4,
    isPopular: false,
    isAvailable: true,
  },
];

const mockPricingTiers: PricingTier[] = [
  {
    id: "individual",
    name: "Individual",
    basePrice: 4200,
    currency: "THB",
    description: "Perfect for solo travelers",
    features: [
      "Shared transportation",
      "All standard inclusions",
      "Group experience",
    ],
  },
  {
    id: "couple",
    name: "Couple",
    basePrice: 4000,
    currency: "THB",
    description: "Special rate for two people",
    features: [
      "Shared transportation",
      "All standard inclusions",
      "Couple discount applied",
    ],
  },
  {
    id: "group",
    name: "Group (4+)",
    basePrice: 3800,
    currency: "THB",
    description: "Best value for groups",
    features: [
      "Shared transportation",
      "All standard inclusions",
      "Group discount applied",
    ],
  },
];

export const usePackageStore = create<PackageState>((set, get) => ({
  // Initial state
  packages: [],
  pricingTiers: [],
  currentPrice: 4200,
  currency: "THB",
  isLoading: false,
  error: null,

  // Actions
  fetchPackages: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await servicePackagesService.getAll();

      // Transform database data to match interface
      const transformedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.currency,
        description: item.description,
        features: item.features,
        duration: item.duration,
        maxPassengers: item.max_passengers,
        isPopular: item.is_popular,
        isAvailable: item.is_available,
      }));

      set({ packages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch packages:", error);
      // Fallback to mock data
      set({
        packages: mockPackages,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch packages",
      });
    }
  },

  fetchPricingTiers: async () => {
    try {
      set({ isLoading: true, error: null });
      // For now, use mock data since pricing tiers might be stored differently
      // In the future, you can create a separate service for pricing tiers
      set({
        pricingTiers: mockPricingTiers,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch pricing tiers",
        isLoading: false,
      });
    }
  },

  fetchCurrentPrice: async () => {
    try {
      set({ isLoading: true, error: null });
      // Get the first available package price as current price
      const packages = await servicePackagesService.getAvailable();
      const currentPrice = packages.length > 0 ? packages[0].price : 4200;

      set({
        currentPrice,
        currency: "THB",
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch current price:", error);
      // Fallback to default price
      set({
        currentPrice: 4200,
        currency: "THB",
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch current price",
      });
    }
  },

  updatePrice: (newPrice: number) => {
    set({ currentPrice: newPrice });
  },

  updatePackage: (packageId: string, updates: Partial<ServicePackage>) => {
    const { packages } = get();
    const updatedPackages = packages.map((pkg) =>
      pkg.id === packageId ? { ...pkg, ...updates } : pkg
    );
    set({ packages: updatedPackages });
  },

  addPackage: (newPackage: Omit<ServicePackage, "id">) => {
    const { packages } = get();
    const packageWithId: ServicePackage = {
      ...newPackage,
      id: `package-${Date.now()}`,
    };
    set({ packages: [...packages, packageWithId] });
  },

  removePackage: (packageId: string) => {
    const { packages } = get();
    const filteredPackages = packages.filter((pkg) => pkg.id !== packageId);
    set({ packages: filteredPackages });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

// Helper functions
export const getPackageById = (
  packages: ServicePackage[],
  id: string
): ServicePackage | undefined => {
  return packages.find((pkg) => pkg.id === id);
};

export const getPopularPackages = (
  packages: ServicePackage[]
): ServicePackage[] => {
  return packages.filter((pkg) => pkg.isPopular);
};

export const getAvailablePackages = (
  packages: ServicePackage[]
): ServicePackage[] => {
  return packages.filter((pkg) => pkg.isAvailable);
};

export const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "THB" ? "THB" : "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
