import { supabase } from "./supabase";

export interface WebConfigItem {
  id?: string;
  key: string;
  value: string;
  description?: string;
  category: string;
  type: "text" | "number" | "boolean" | "json" | "url" | "email" | "textarea";
  is_required: boolean;
  is_public: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface WebConfigByCategory {
  [category: string]: WebConfigItem[];
}

/**
 * Get all web configuration settings
 */
export async function getAllWebConfig(): Promise<WebConfigItem[]> {
  try {
    const { data, error } = await supabase
      .from("web_config")
      .select("*")
      .order("category, display_order");

    if (error) {
      console.error("Error fetching web config:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAllWebConfig:", error);
    return [];
  }
}

/**
 * Get web configuration settings grouped by category
 */
export async function getWebConfigByCategory(): Promise<WebConfigByCategory> {
  try {
    const configs = await getAllWebConfig();

    return configs.reduce((acc, config) => {
      if (!acc[config.category]) {
        acc[config.category] = [];
      }
      acc[config.category].push(config);
      return acc;
    }, {} as WebConfigByCategory);
  } catch (error) {
    console.error("Error in getWebConfigByCategory:", error);
    return {};
  }
}

/**
 * Get public web configuration settings (for frontend)
 */
export async function getPublicWebConfig(): Promise<WebConfigItem[]> {
  try {
    const { data, error } = await supabase
      .from("web_config")
      .select("*")
      .eq("is_public", true)
      .order("category, display_order");

    if (error) {
      console.error("Error fetching public web config:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getPublicWebConfig:", error);
    return [];
  }
}

/**
 * Get a specific configuration value by key
 */
export async function getConfigValue(key: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("web_config")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      console.error(`Error fetching config value for key ${key}:`, error);
      return null;
    }

    return data?.value || null;
  } catch (error) {
    console.error("Error in getConfigValue:", error);
    return null;
  }
}

/**
 * Set a configuration value
 */
export async function setConfigValue(
  key: string,
  value: string
): Promise<boolean> {
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
      console.error(`Error setting config value for key ${key}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in setConfigValue:", error);
    return false;
  }
}

/**
 * Update multiple configuration values
 */
export async function updateMultipleConfigs(
  configs: { key: string; value: string }[]
): Promise<boolean> {
  try {
    const updates = configs.map((config) => ({
      key: config.key,
      value: config.value,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("web_config").upsert(updates, {
      onConflict: "key",
    });

    if (error) {
      console.error("Error updating multiple configs:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateMultipleConfigs:", error);
    return false;
  }
}

/**
 * Get configuration settings for a specific category
 */
export async function getConfigByCategory(
  category: string
): Promise<WebConfigItem[]> {
  try {
    const { data, error } = await supabase
      .from("web_config")
      .select("*")
      .eq("category", category)
      .order("display_order");

    if (error) {
      console.error(`Error fetching config for category ${category}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getConfigByCategory:", error);
    return [];
  }
}

/**
 * Helper function to parse JSON config values safely
 */
export function parseConfigValue(
  value: string,
  type: string
): string | number | boolean | object {
  if (!value) return value;

  switch (type) {
    case "json":
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    case "number":
      const num = Number(value);
      return isNaN(num) ? value : num;
    case "boolean":
      return value.toLowerCase() === "true";
    default:
      return value;
  }
}

/**
 * Helper function to stringify values for storage
 */
export function stringifyConfigValue(
  value: string | number | boolean | object | null | undefined,
  type: string
): string {
  if (value === null || value === undefined) return "";

  switch (type) {
    case "json":
      return typeof value === "string" ? value : JSON.stringify(value);
    case "number":
    case "boolean":
      return String(value);
    default:
      return String(value);
  }
}

/**
 * Get business hours as a structured object
 */
export async function getBusinessHours(): Promise<{ [day: string]: string }> {
  try {
    const configs = await getConfigByCategory("business");
    const hours: { [day: string]: string } = {};

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    days.forEach((day) => {
      const config = configs.find((c) => c.key === `business_hours_${day}`);
      if (config) {
        hours[day] = config.value;
      }
    });

    return hours;
  } catch (error) {
    console.error("Error getting business hours:", error);
    return {};
  }
}

/**
 * Update business hours
 */
export async function updateBusinessHours(hours: {
  [day: string]: string;
}): Promise<boolean> {
  try {
    const updates = Object.entries(hours).map(([day, time]) => ({
      key: `business_hours_${day}`,
      value: time,
    }));

    return await updateMultipleConfigs(updates);
  } catch (error) {
    console.error("Error updating business hours:", error);
    return false;
  }
}
