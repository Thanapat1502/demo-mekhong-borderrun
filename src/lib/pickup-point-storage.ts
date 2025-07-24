import { supabase } from './supabase';

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
    const fileName = `pickup-${Date.now()}-${Math.random()
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
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

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
 * Save pickup point image to database
 * @param imageData - Image data to save
 * @param imageUrl - The uploaded image URL
 * @returns Promise<{success: boolean, id?: string, error?: string}>
 */
export async function savePickupPointImage(
  imageData: PickupPointImageData,
  imageUrl: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('pickup_point_images')
      .insert([{
        src: imageUrl,
        alt: imageData.alt,
        title: imageData.title,
        location: imageData.location,
        description: imageData.description,
        google_map_url: imageData.google_map_url || null,
      }])
      .select('id')
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      id: data.id
    };
  } catch (error) {
    console.error('Save pickup point image error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Update pickup point image metadata in database
 * @param id - Image ID
 * @param updateData - Updated image data
 * @returns Promise<boolean>
 */
export async function updatePickupPointImage(
  id: string,
  updateData: PickupPointImageUpdate
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('pickup_point_images')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Database update error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Update pickup point image error:', error);
    return false;
  }
}

/**
 * Delete pickup point image from database
 * @param id - Image ID
 * @returns Promise<boolean>
 */
export async function deletePickupPointImage(
  id: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('pickup_point_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete pickup point image error:', error);
    return false;
  }
}

/**
 * Complete pickup point image upload process (upload file + save metadata)
 * @param file - The image file to upload
 * @param imageData - Image metadata
 * @param bucket - Storage bucket (default: 'images')
 * @returns Promise<{success: boolean, id?: string, url?: string, error?: string}>
 */
export async function uploadPickupPointImageComplete(
  file: File,
  imageData: PickupPointImageData,
  bucket: string = 'images'
): Promise<{
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}> {
  try {
    // Upload file to storage
    const uploadResult = await uploadImageToSupabase(file, bucket);
    
    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error
      };
    }

    // Save metadata to database
    const saveResult = await savePickupPointImage(imageData, uploadResult.url!);

    if (!saveResult.success) {
      // Cleanup: delete uploaded file if metadata save failed
      if (uploadResult.path) {
        await deleteImageFromSupabase(uploadResult.path, bucket);
      }
      
      return {
        success: false,
        error: saveResult.error
      };
    }

    return {
      success: true,
      id: saveResult.id,
      url: uploadResult.url
    };

  } catch (error) {
    console.error('Complete upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Complete pickup point image deletion process (delete file + metadata)
 * @param id - Image ID
 * @param imagePath - Storage path
 * @param bucket - Storage bucket (default: 'images')
 * @returns Promise<boolean>
 */
export async function deletePickupPointImageComplete(
  id: string,
  imagePath: string,
  bucket: string = 'images'
): Promise<boolean> {
  try {
    // Delete from database first
    const metadataDeleted = await deletePickupPointImage(id);
    
    // Delete from storage (don't need to check result as metadata deletion is more critical)
    await deleteImageFromSupabase(imagePath, bucket);

    // Return true if metadata was deleted successfully
    return metadataDeleted;

  } catch (error) {
    console.error('Complete delete error:', error);
    return false;
  }
}
