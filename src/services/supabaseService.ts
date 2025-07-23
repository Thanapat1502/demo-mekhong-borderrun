import {
  supabase,
  TABLES,
  handleSupabaseError,
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

// Helper function to ensure supabase client is available
const ensureSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    throw new Error(
      "Supabase client not initialized. Please check your environment variables."
    );
  }
  return supabase;
};

// Hero Images Service
export const heroImagesService = {
  async getAll() {
    try {
      const client = ensureSupabase();
      const { data, error } = await client
        .from(TABLES.HERO_IMAGES)
        .select("*")
        .order("priority", { ascending: false })
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(
    heroImage: Omit<HeroImageRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const client = ensureSupabase();
      const { data, error } = await client
        .from(TABLES.HERO_IMAGES)
        .insert(heroImage)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(
    id: string,
    updates: Partial<Omit<HeroImageRow, "id" | "created_at" | "updated_at">>
  ) {
    try {
      const client = ensureSupabase();
      const { data, error } = await client
        .from(TABLES.HERO_IMAGES)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string) {
    try {
      const client = ensureSupabase();
      const { error } = await client
        .from(TABLES.HERO_IMAGES)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Journey Images Service
export const journeyImagesService = {
  async getAll() {
    try {
      const client = ensureSupabase();
      const { data, error } = await client
        .from(TABLES.JOURNEY_IMAGES)
        .select("*")
        .order("step", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(
    journeyImage: Omit<JourneyImageRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.JOURNEY_IMAGES)
        .insert(journeyImage)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(
    id: string,
    updates: Partial<Omit<JourneyImageRow, "id" | "created_at" | "updated_at">>
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.JOURNEY_IMAGES)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(TABLES.JOURNEY_IMAGES)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Pickup Point Images Service
export const pickupPointImagesService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLES.PICKUP_POINT_IMAGES)
        .select("*")
        .order("title", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(
    pickupPoint: Omit<PickupPointImageRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PICKUP_POINT_IMAGES)
        .insert(pickupPoint)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(
    id: string,
    updates: Partial<
      Omit<PickupPointImageRow, "id" | "created_at" | "updated_at">
    >
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PICKUP_POINT_IMAGES)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(TABLES.PICKUP_POINT_IMAGES)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Gallery Images Service
export const galleryImagesService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_IMAGES)
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async getByCategory(category: string) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_IMAGES)
        .select("*")
        .eq("category", category)
        .order("featured", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(
    galleryImage: Omit<GalleryImageRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_IMAGES)
        .insert(galleryImage)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(
    id: string,
    updates: Partial<Omit<GalleryImageRow, "id" | "created_at" | "updated_at">>
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GALLERY_IMAGES)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(TABLES.GALLERY_IMAGES)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Customer Reviews Service
export const customerReviewsService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async getVerified() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .select("*")
        .eq("verified", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async getFeatured() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .select("*")
        .eq("verified", true)
        .order("rating", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(
    review: Omit<CustomerReviewRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .insert(review)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(
    id: number,
    updates: Partial<
      Omit<CustomerReviewRow, "id" | "created_at" | "updated_at">
    >
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: number) {
    try {
      const { error } = await supabase
        .from(TABLES.CUSTOMER_REVIEWS)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Service Packages Service
export const servicePackagesService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLES.SERVICE_PACKAGES)
        .select("*")
        .order("is_popular", { ascending: false })
        .order("price", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async getAvailable() {
    try {
      const { data, error } = await supabase
        .from(TABLES.SERVICE_PACKAGES)
        .select("*")
        .eq("is_available", true)
        .order("is_popular", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(
    servicePackage: Omit<ServicePackageRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SERVICE_PACKAGES)
        .insert(servicePackage)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(
    id: string,
    updates: Partial<
      Omit<ServicePackageRow, "id" | "created_at" | "updated_at">
    >
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SERVICE_PACKAGES)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(TABLES.SERVICE_PACKAGES)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Contact Info Service
export const contactInfoService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CONTACT_INFO)
        .select("*")
        .order("is_primary", { ascending: false })
        .order("type", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async getPublic() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CONTACT_INFO)
        .select("*")
        .eq("is_public", true)
        .order("is_primary", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async create(
    contactInfo: Omit<ContactInfoRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.CONTACT_INFO)
        .insert(contactInfo)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async update(
    id: string,
    updates: Partial<Omit<ContactInfoRow, "id" | "created_at" | "updated_at">>
  ) {
    try {
      const { data, error } = await supabase
        .from(TABLES.CONTACT_INFO)
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(TABLES.CONTACT_INFO)
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Owner Info Service
export const ownerInfoService = {
  async get() {
    try {
      const { data, error } = await supabase
        .from(TABLES.OWNER_INFO)
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows returned
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async createOrUpdate(
    ownerInfo: Omit<OwnerInfoRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const existing = await this.get();

      if (existing) {
        const { data, error } = await supabase
          .from(TABLES.OWNER_INFO)
          .update(ownerInfo)
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from(TABLES.OWNER_INFO)
          .insert(ownerInfo)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};

// Business Info Service
export const businessInfoService = {
  async get() {
    try {
      const { data, error } = await supabase
        .from(TABLES.BUSINESS_INFO)
        .select("*")
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows returned
      return data;
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },

  async createOrUpdate(
    businessInfo: Omit<BusinessInfoRow, "id" | "created_at" | "updated_at">
  ) {
    try {
      const existing = await this.get();

      if (existing) {
        const { data, error } = await supabase
          .from(TABLES.BUSINESS_INFO)
          .update(businessInfo)
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from(TABLES.BUSINESS_INFO)
          .insert(businessInfo)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      throw new Error(handleSupabaseError(error));
    }
  },
};
