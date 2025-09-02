import { create } from "zustand";
import servicePackagesData from "@/data/static/service-packages.json";

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

// No fallback mock data - only use real data from Supabase

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

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const transformedData = servicePackagesData.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.currency,
        description: item.description,
        features: item.features,
        duration: item.duration,
        maxPassengers: item.maxPassengers,
        isPopular: item.isPopular,
        isAvailable: item.isAvailable,
      }));

      set({ packages: transformedData, isLoading: false });
    } catch (error) {
      console.error("Failed to load packages:", error);
      set({
        packages: [], // Fallback to empty array
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to load packages",
      });
    }
  },

  fetchPricingTiers: async () => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Implement pricing tiers service when available
      set({
        pricingTiers: [], // No fallback - empty array
        isLoading: false,
      });
    } catch (error) {
      set({
        pricingTiers: [], // No fallback - empty array
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

      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get the first available package price as current price from static data
      const availablePackages = servicePackagesData.filter(
        (pkg) => pkg.isAvailable
      );
      const currentPrice =
        availablePackages.length > 0 ? availablePackages[0].price : 4200;

      set({
        currentPrice,
        currency: "THB",
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to load current price:", error);
      set({
        currentPrice: 4200, // Fallback to default price
        currency: "THB",
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load current price",
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
