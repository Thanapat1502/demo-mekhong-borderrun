"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  style,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Start loading 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate a simple blur placeholder if none provided
  const generateBlurDataURL = (w: number = 10, h: number = 10) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL();

  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={style}
      >
        <div className="text-gray-400 text-sm">Failed to load image</div>
      </div>
    );
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Loading placeholder */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={placeholder === "blur" ? defaultBlurDataURL : undefined}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}

      {/* Placeholder when not in view */}
      {!isInView && !priority && (
        <div className="w-full h-full bg-gray-100 animate-pulse"></div>
      )}
    </div>
  );
}

// Utility function to create optimized image URLs
export const createOptimizedImageUrl = (
  src: string,
  width?: number,
  height?: number,
  quality: number = 75
) => {
  // If using a CDN like Cloudinary, Vercel, or similar, you can add optimization parameters
  // For now, return the original URL
  const url = new URL(src, window.location.origin);
  
  if (width) url.searchParams.set("w", width.toString());
  if (height) url.searchParams.set("h", height.toString());
  url.searchParams.set("q", quality.toString());
  
  return url.toString();
};

// Preload critical images
export const preloadImage = (src: string, priority: boolean = false) => {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = priority ? "preload" : "prefetch";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
};

// Hook for progressive image loading
export const useProgressiveImage = (src: string, placeholder?: string) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder || "");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { currentSrc, isLoaded };
};
