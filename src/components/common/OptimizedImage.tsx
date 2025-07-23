"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { normalizeImageUrl, getImageDimensions } from "@/lib/imageUtils";

interface OptimizedImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallback?: string;
  showPlaceholder?: boolean;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fallback = "/image/placeholder.jpg",
  showPlaceholder = true,
  className = "",
  width,
  height,
  fill,
  sizes,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(normalizeImageUrl(src));
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get default dimensions if not provided
  const defaultDimensions = getImageDimensions(src);
  const imageWidth = width || defaultDimensions.width;
  const imageHeight = height || defaultDimensions.height;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (imageSrc !== fallback) {
      setImageSrc(fallback);
    }
  };

  // Show placeholder while loading
  if (isLoading && showPlaceholder) {
    return (
      <div
        className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
        style={{
          width: fill ? "100%" : imageWidth,
          height: fill ? "100%" : imageHeight,
        }}>
        <svg
          className="w-8 h-8 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : imageWidth}
      height={fill ? undefined : imageHeight}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={`${className} ${hasError ? "opacity-75" : ""}`}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}
