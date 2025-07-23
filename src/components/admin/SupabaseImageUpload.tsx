"use client";

import { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import {
  ImageUploadService,
  UploadProgress,
} from "@/services/imageUploadService";
import Image from "next/image";

interface SupabaseImageUploadProps {
  currentImageUrl?: string;
  category: string;
  onImageUploaded: (url: string, path: string) => void;
  onImageRemoved?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function SupabaseImageUpload({
  currentImageUrl,
  category,
  onImageUploaded,
  onImageRemoved,
  className = "",
  disabled = false,
}: SupabaseImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      // Validate file
      const validation = ImageUploadService.validateFile(file);
      if (!validation.valid) {
        setError(validation.error || "Invalid file");
        setIsUploading(false);
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Upload file
      const result = await ImageUploadService.uploadImage(file, category);

      if (result.success && result.url && result.path) {
        onImageUploaded(result.url, result.path);
        setPreviewUrl(result.url);
      } else {
        setError(result.error || "Upload failed");
        setPreviewUrl(currentImageUrl || null);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed");
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setError(null);
    if (onImageRemoved) {
      onImageRemoved();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current/Preview Image */}
      {previewUrl && (
        <div className="relative group">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Remove button */}
            {!disabled && (
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                type="button">
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!previewUrl && (
        <div
          onClick={handleUploadClick}
          className={`
            border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer
            hover:border-gray-400 transition-colors
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}>
          <FiImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Click to upload image</p>
          <p className="text-base text-gray-500">PNG, JPG, WEBP up to 5MB</p>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-2">
        <Button
          onClick={handleUploadClick}
          disabled={disabled || isUploading}
          color="primary"
          variant="flat"
          startContent={<FiUpload />}>
          {isUploading
            ? "Uploading..."
            : previewUrl
            ? "Change Image"
            : "Upload Image"}
        </Button>

        {previewUrl && !disabled && (
          <Button
            onClick={handleRemoveImage}
            color="danger"
            variant="flat"
            startContent={<FiX />}>
            Remove
          </Button>
        )}
      </div>

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="space-y-2">
          <div className="flex justify-between text-base text-gray-600">
            <span>Uploading...</span>
            <span>{Math.round(uploadProgress.percentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-base">{error}</p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
