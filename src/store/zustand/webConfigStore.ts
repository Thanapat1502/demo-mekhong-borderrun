import { create } from "zustand";
import webConfigData from "@/data/static/web-config.json";

export interface WebConfig {
  website_title: string;
  website_description: string;
  business_hours: string;
  service_area: string;
  contact_email: string;
  contact_phone: string;
}

interface WebConfigStore {
  config: WebConfig;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchWebConfig: () => Promise<void>;
  updateWebConfig: (updates: Partial<WebConfig>) => Promise<boolean>;
  clearError: () => void;
}

const defaultConfig: WebConfig = {
  website_title: "Mekong Border Run",
  website_description: "Professional border run service from Chiang Mai",
  business_hours: "9:00 AM - 6:00 PM",
  service_area: "Chiang Mai, Thailand",
  contact_email: "info@mekong-borderrun.com",
  contact_phone: "+66 123 456 789",
};

export const useWebConfigStore = create<WebConfigStore>((set, get) => ({
  config: defaultConfig,
  isLoading: false,
  error: null,

  fetchWebConfig: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate async loading for consistency
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use static data directly
      const finalConfig = { ...defaultConfig, ...webConfigData };

      set({
        config: finalConfig,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error loading web config:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to load web config",
        config: defaultConfig, // Fallback to default config
      });
    }
  },

  updateWebConfig: async (updates: Partial<WebConfig>) => {
    set({ isLoading: true, error: null });
    try {
      // Prepare upsert data
      const upsertData = Object.entries(updates).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("web_config").upsert(upsertData, {
        onConflict: "key",
      });

      if (error) {
        console.log("config xII upsert fail", error);
        throw error;
      }

      // Update local state
      const currentConfig = get().config;
      const updatedConfig = { ...currentConfig, ...updates };

      set({
        config: updatedConfig,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      console.error("Error updating web config:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update web config",
      });
      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Service functions for external use
export const webConfigService = {
  /**
   * Update multiple web config values
   */
  updateWebConfig: async (updates: Partial<WebConfig>): Promise<boolean> => {
    try {
      const upsertData = Object.entries(updates).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("web_config").upsert(upsertData, {
        onConflict: "key",
      });

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error("Error updating web config:", error);
      return false;
    }
  },

  /**
   * Fetch web config from database
   */
  fetchWebConfig: async (): Promise<WebConfig> => {
    try {
      const { data, error } = await supabase
        .from("web_config")
        .select("key, value");

      if (error) {
        throw error;
      }

      // Transform array of key-value pairs to config object
      const configData: Partial<WebConfig> = {};

      if (data) {
        data.forEach((item) => {
          if (item.key in defaultConfig) {
            (configData as Record<string, string>)[item.key] = item.value;
          }
        });
      }

      // Merge with default config to ensure all fields are present
      return { ...defaultConfig, ...configData };
    } catch (error) {
      console.error("Error fetching web config:", error);
      return defaultConfig; // Fallback to default config
    }
  },

  /**
   * Update a single web config value
   */
  updateSingleConfig: async (
    key: keyof WebConfig,
    value: string
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.from("web_config").upsert(
        {
          key,
          value,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "key",
        }
      );

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      return false;
    }
  },
};
