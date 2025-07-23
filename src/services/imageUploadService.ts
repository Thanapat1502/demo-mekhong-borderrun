import { supabase } from "@/lib/supabase";

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  path?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class ImageUploadService {
  private static readonly BUCKET_NAME = "images";

  // Allowed image types
  private static readonly ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  // Max file size (5MB)
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

  /**
   * Validate file before upload
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed types: ${this.ALLOWED_TYPES.join(
          ", "
        )}`,
      };
    }

    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${
          this.MAX_FILE_SIZE / 1024 / 1024
        }MB`,
      };
    }

    return { valid: true };
  }

  /**
   * Generate unique file path
   */
  static generateFilePath(file: File, category: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split(".").pop();
    return `${category}/${timestamp}-${randomString}.${fileExtension}`;
  }

  /**
   * Upload image to Supabase Storage
   */
  static async uploadImage(
    file: File,
    category: string
  ): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Check if Supabase is available
      if (!supabase) {
        return { success: false, error: "Supabase client not initialized" };
      }

      // Generate file path
      const filePath = this.generateFilePath(file, category);

      // Upload file
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        return { success: false, error: error.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath);

      return {
        success: true,
        url: urlData.publicUrl,
        path: filePath,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  /**
   * Delete image from Supabase Storage
   */
  static async deleteImage(filePath: string): Promise<UploadResult> {
    try {
      if (!supabase) {
        return { success: false, error: "Supabase client not initialized" };
      }

      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Delete failed",
      };
    }
  }

  /**
   * Replace existing image (delete old, upload new)
   */
  static async replaceImage(
    oldFilePath: string,
    newFile: File,
    category: string
  ): Promise<UploadResult> {
    try {
      // Upload new image first
      const uploadResult = await this.uploadImage(newFile, category);

      if (!uploadResult.success) {
        return uploadResult;
      }

      // Delete old image (don't fail if this fails)
      if (oldFilePath) {
        await this.deleteImage(oldFilePath);
      }

      return uploadResult;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Replace failed",
      };
    }
  }

  /**
   * Get public URL for existing image
   */
  static getPublicUrl(filePath: string): string | null {
    try {
      if (!supabase) return null;

      const { data } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error getting public URL:", error);
      return null;
    }
  }

  /**
   * Extract file path from Supabase URL
   */
  static extractFilePathFromUrl(url: string): string | null {
    try {
      // Supabase storage URLs have format:
      // https://project.supabase.co/storage/v1/object/public/bucket/path
      const urlParts = url.split("/storage/v1/object/public/images/");
      return urlParts.length > 1 ? urlParts[1] : null;
    } catch (error) {
      console.error("Error extracting file path:", error);
      return null;
    }
  }

  /**
   * Check if URL is a Supabase storage URL
   */
  static isSupabaseStorageUrl(url: string): boolean {
    return url.includes(".supabase.co/storage/v1/object/public/");
  }

  /**
   * Migrate local image URL to Supabase storage
   */
  static async migrateLocalImage(
    localUrl: string,
    category: string
  ): Promise<UploadResult> {
    try {
      // If already a Supabase URL, return as is
      if (this.isSupabaseStorageUrl(localUrl)) {
        return { success: true, url: localUrl };
      }

      // Fetch the local image
      const response = await fetch(localUrl);
      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch local image: ${response.statusText}`,
        };
      }

      // Convert to blob
      const blob = await response.blob();

      // Create file object
      const fileName = localUrl.split("/").pop() || "image.jpg";
      const file = new File([blob], fileName, { type: blob.type });

      // Upload to Supabase
      return await this.uploadImage(file, category);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Migration failed",
      };
    }
  }
}

// Export convenience functions
export const uploadImage =
  ImageUploadService.uploadImage.bind(ImageUploadService);
export const deleteImage =
  ImageUploadService.deleteImage.bind(ImageUploadService);
export const replaceImage =
  ImageUploadService.replaceImage.bind(ImageUploadService);
export const getPublicUrl =
  ImageUploadService.getPublicUrl.bind(ImageUploadService);
export const migrateLocalImage =
  ImageUploadService.migrateLocalImage.bind(ImageUploadService);
