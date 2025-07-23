/**
 * Image utility functions for handling Supabase storage URLs and local images
 */

/**
 * Normalize image URL by removing double slashes and ensuring proper format
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return "";
  
  // Handle Supabase storage URLs
  if (url.includes("supabase.co/storage/v1/object/public/")) {
    // Remove double slashes in the path part
    const parts = url.split("/storage/v1/object/public/");
    if (parts.length === 2) {
      const [baseUrl, path] = parts;
      // Remove double slashes from the path
      const cleanPath = path.replace(/\/+/g, "/");
      return `${baseUrl}/storage/v1/object/public/${cleanPath}`;
    }
  }
  
  // Handle local URLs
  if (url.startsWith("/")) {
    // Remove double slashes from local paths
    return url.replace(/\/+/g, "/");
  }
  
  return url;
}

/**
 * Check if URL is a Supabase storage URL
 */
export function isSupabaseStorageUrl(url: string): boolean {
  return url.includes(".supabase.co/storage/v1/object/public/");
}

/**
 * Check if URL is a local image
 */
export function isLocalImage(url: string): boolean {
  return url.startsWith("/") && !isSupabaseStorageUrl(url);
}

/**
 * Get optimized image URL with fallback
 */
export function getOptimizedImageUrl(
  url: string, 
  fallback: string = "/image/placeholder.jpg"
): string {
  if (!url) return fallback;
  
  const normalizedUrl = normalizeImageUrl(url);
  
  // Return the normalized URL
  return normalizedUrl || fallback;
}

/**
 * Extract file name from URL
 */
export function getImageFileName(url: string): string {
  if (!url) return "";
  
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    return pathname.split("/").pop() || "";
  } catch {
    // If URL parsing fails, try simple string manipulation
    return url.split("/").pop() || "";
  }
}

/**
 * Get image dimensions from URL (for optimization)
 */
export function getImageDimensions(url: string): { width?: number; height?: number } {
  // This could be extended to read actual image dimensions
  // For now, return default dimensions based on image type
  
  if (url.includes("hero")) {
    return { width: 1920, height: 1080 };
  }
  
  if (url.includes("avatar")) {
    return { width: 200, height: 200 };
  }
  
  if (url.includes("gallery")) {
    return { width: 800, height: 600 };
  }
  
  // Default dimensions
  return { width: 800, height: 600 };
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(url: string, sizes: number[] = [400, 800, 1200]): string {
  if (!url) return "";
  
  const normalizedUrl = normalizeImageUrl(url);
  
  // For Supabase images, we could add transformation parameters
  // For now, just return the same URL for all sizes
  return sizes.map(size => `${normalizedUrl} ${size}w`).join(", ");
}

/**
 * Image loading error handler
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string = "/image/placeholder.jpg"
): void {
  const img = event.currentTarget;
  if (img.src !== fallbackUrl) {
    img.src = fallbackUrl;
  }
}

/**
 * Preload critical images
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = normalizeImageUrl(url);
  });
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(urls: string[]): Promise<void> {
  const promises = urls.map(url => preloadImage(url));
  await Promise.allSettled(promises);
}
