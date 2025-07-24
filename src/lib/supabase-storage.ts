import { supabase } from "./supabase";

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  error?: string;
  path?: string;
}

export interface PickupPointImageData {
  title: string;
  alt: string;
  location: string;
  description: string;
  google_map_url?: string;
}

export interface PickupPointImageUpdate {
  title?: string;
  alt?: string;
  location?: string;
  description?: string;
  google_map_url?: string;
}

/**
 * Upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'images')
 * @returns Promise<ImageUploadResult>
 */
export async function uploadImageToSupabase(
  file: File,
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

    // Generate unique filename (no folder structure)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    // Upload file to Supabase Storage (directly to bucket root)
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
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
      .getPublicUrl(fileName);

    return {
      success: true,
      url: urlData.publicUrl,
      path: fileName,
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
 * @param path - The file path in storage
 * @param bucket - The storage bucket name (default: 'images')
 * @returns Promise<boolean>
 */
export async function deleteImageFromSupabase(
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

// Note: Specific image metadata functions have been moved to pickup-point-storage.ts
// This file now only contains generic storage functions

/**
 * Simple upload function that just uploads to storage and returns URL
 * For backward compatibility with existing code
 * @param file - The image file to upload
 * @param metadata - Basic metadata (not used, for compatibility)
 * @param options - Upload options
 * @returns Promise<{success: boolean, url?: string, error?: string}>
 */
export async function uploadImageComplete(
  file: File,
  metadata?: Record<string, unknown>, // For backward compatibility
  options: {
    bucket?: string;
  } = {}
): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  const { bucket = "images" } = options;

  try {
    // Upload file to storage
    const uploadResult = await uploadImageToSupabase(file, bucket);

    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error,
      };
    }

    return {
      success: true,
      url: uploadResult.url,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Complete upload and delete functions for pickup points have been moved to pickup-point-storage.ts
