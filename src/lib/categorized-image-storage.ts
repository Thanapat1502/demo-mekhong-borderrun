import { supabase } from "./supabase";

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  error?: string;
  path?: string;
}

// Image categories
export type ImageCategory = "public" | "customer" | "owner";

// Generic image data interface
export interface BaseImageData {
  title: string;
  alt: string;
  description: string;
}

// Pickup point specific data (public category)
export interface PickupPointImageData extends BaseImageData {
  location: string;
  google_map_url?: string;
}

// Customer image data
export interface CustomerImageData extends BaseImageData {
  customer_name?: string;
  review_id?: string;
}

// Owner image data
export interface OwnerImageData extends BaseImageData {
  owner_name?: string;
  position?: string;
}

// Update interfaces
export interface PickupPointImageUpdate {
  title?: string;
  alt?: string;
  location?: string;
  description?: string;
  google_map_url?: string;
}

export interface CustomerImageUpdate {
  title?: string;
  alt?: string;
  description?: string;
  customer_name?: string;
  review_id?: string;
}

export interface OwnerImageUpdate {
  title?: string;
  alt?: string;
  description?: string;
  owner_name?: string;
  position?: string;
}

/**
 * Upload an image to Supabase Storage with category-based folder structure
 * @param file - The image file to upload
 * @param category - Image category (public, customer, owner)
 * @param bucket - The storage bucket name (default: 'images')
 * @returns Promise<ImageUploadResult>
 */
export async function uploadCategorizedImage(
  file: File,
  category: ImageCategory = "public",
  bucket: string = "images"
): Promise<ImageUploadResult> {
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      return {
        success: false,
        error: "File must be an image",
      };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: "File size must be less than 5MB",
      };
    }

    // Generate unique filename with category prefix
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2);

    let fileName: string;
    let filePath: string;

    switch (category) {
      case "public":
        fileName = `pickup-${timestamp}-${randomId}.${fileExt}`;
        filePath = `public/${fileName}`;
        break;
      case "customer":
        fileName = `customer-${timestamp}-${randomId}.${fileExt}`;
        filePath = `customer/${fileName}`;
        break;
      case "owner":
        fileName = `owner-${timestamp}-${randomId}.${fileExt}`;
        filePath = `owner/${fileName}`;
        break;
      default:
        fileName = `image-${timestamp}-${randomId}.${fileExt}`;
        filePath = `public/${fileName}`;
    }

    // Upload file to Supabase Storage with folder structure
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param path - The file path in storage (including folder)
 * @param bucket - The storage bucket name (default: 'images')
 * @returns Promise<boolean>
 */
export async function deleteCategorizedImage(
  path: string,
  bucket: string = "images"
): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error("Supabase delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

/**
 * List images from a specific category folder
 * @param category - Image category (public, customer, owner)
 * @param bucket - The storage bucket name (default: 'images')
 * @returns Promise<string[]> - Array of file paths
 */
export async function listCategorizedImages(
  category: ImageCategory,
  bucket: string = "images"
): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(category, {
      limit: 100,
      offset: 0,
    });

    if (error) {
      console.error("List images error:", error);
      return [];
    }

    return data?.map((file) => `${category}/${file.name}`) || [];
  } catch (error) {
    console.error("List images error:", error);
    return [];
  }
}

/**
 * Get public URL for a categorized image
 * @param path - The file path in storage (including folder)
 * @param bucket - The storage bucket name (default: 'images')
 * @returns string - Public URL
 */
export function getCategorizedImageUrl(
  path: string,
  bucket: string = "images"
): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}

// Pickup Point specific functions
export async function savePickupPointImage(
  imageData: PickupPointImageData,
  imageUrl: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("pickup_point_images")
      .insert([
        {
          src: imageUrl,
          alt: imageData.alt,
          title: imageData.title,
          location: imageData.location,
          description: imageData.description,
          google_map_url: imageData.google_map_url || null,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    console.error("Save pickup point image error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function updatePickupPointImage(
  id: string,
  updateData: PickupPointImageUpdate
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("pickup_point_images")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Database update error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Update pickup point image error:", error);
    return false;
  }
}

export async function deletePickupPointImage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("pickup_point_images")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Database delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete pickup point image error:", error);
    return false;
  }
}

// Complete upload functions for all categories
export async function uploadPickupPointImageComplete(
  file: File,
  imageData: PickupPointImageData,
  bucket: string = "images"
): Promise<{
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}> {
  try {
    // Upload file to storage in public folder
    const uploadResult = await uploadCategorizedImage(file, "public", bucket);

    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error,
      };
    }

    // Save metadata to database
    const saveResult = await savePickupPointImage(imageData, uploadResult.url!);

    if (!saveResult.success) {
      // Cleanup: delete uploaded file if metadata save failed
      if (uploadResult.path) {
        await deleteCategorizedImage(uploadResult.path, bucket);
      }

      return {
        success: false,
        error: saveResult.error,
      };
    }

    return {
      success: true,
      id: saveResult.id,
      url: uploadResult.url,
    };
  } catch (error) {
    console.error("Complete pickup point upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function deletePickupPointImageComplete(
  id: string,
  imagePath: string,
  bucket: string = "images"
): Promise<boolean> {
  try {
    // Delete from database first
    const metadataDeleted = await deletePickupPointImage(id);

    // Delete from storage
    await deleteCategorizedImage(imagePath, bucket);

    return metadataDeleted;
  } catch (error) {
    console.error("Complete pickup point delete error:", error);
    return false;
  }
}

// Customer image functions
export async function saveCustomerImage(
  imageData: CustomerImageData,
  imageUrl: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("customer_images")
      .insert([
        {
          src: imageUrl,
          alt: imageData.alt,
          title: imageData.title,
          description: imageData.description,
          customer_name: imageData.customer_name || null,
          review_id: imageData.review_id || null,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    console.error("Save customer image error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function uploadCustomerImageComplete(
  file: File,
  imageData: CustomerImageData,
  bucket: string = "images"
): Promise<{
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}> {
  try {
    // Upload file to storage in customer folder
    const uploadResult = await uploadCategorizedImage(file, "customer", bucket);

    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error,
      };
    }

    // Save metadata to database
    const saveResult = await saveCustomerImage(imageData, uploadResult.url!);

    if (!saveResult.success) {
      // Cleanup: delete uploaded file if metadata save failed
      if (uploadResult.path) {
        await deleteCategorizedImage(uploadResult.path, bucket);
      }

      return {
        success: false,
        error: saveResult.error,
      };
    }

    return {
      success: true,
      id: saveResult.id,
      url: uploadResult.url,
    };
  } catch (error) {
    console.error("Complete customer upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Owner image functions - Save avatar URL to owner_info table
export async function saveOwnerImageToProfile(
  imageUrl: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("owner_info")
      .upsert([{ avatar: imageUrl }])
      .select("id")
      .single();

    if (error) {
      console.error("Database insert error:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    console.error("Save owner image error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function uploadOwnerImageComplete(
  file: File,
  _imageData?: OwnerImageData, // Not used, kept for backward compatibility
  bucket: string = "images"
): Promise<{
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}> {
  try {
    // Upload file to storage in owner folder
    const uploadResult = await uploadCategorizedImage(file, "owner", bucket);

    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error,
      };
    }

    // Don't save to owner_images table (doesn't exist)
    // Just return the uploaded image URL
    // The ContactInfoManager will save the URL to owner_info.avatar
    return {
      success: true,
      url: uploadResult.url,
    };
  } catch (error) {
    console.error("Complete owner upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
