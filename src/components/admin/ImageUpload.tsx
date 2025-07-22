"use client";

import { useState, useCallback } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import Image from "next/image";

interface ImageUploadProps {
  onImageUpload: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  className?: string;
}

export default function ImageUpload({
  onImageUpload,
  maxFiles = 10,
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  className = "",
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter((file) =>
        acceptedTypes.includes(file.type)
      );

      if (validFiles.length > 0) {
        const newFiles = [...uploadedFiles, ...validFiles].slice(0, maxFiles);
        setUploadedFiles(newFiles);
        onImageUpload(newFiles);
      }
    },
    [acceptedTypes, maxFiles, uploadedFiles, onImageUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter((file) =>
        acceptedTypes.includes(file.type)
      );

      if (validFiles.length > 0) {
        const newFiles = [...uploadedFiles, ...validFiles].slice(0, maxFiles);
        setUploadedFiles(newFiles);
        onImageUpload(newFiles);
      }
    },
    [acceptedTypes, maxFiles, uploadedFiles, onImageUpload]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = uploadedFiles.filter((_, i) => i !== index);
      setUploadedFiles(newFiles);
      onImageUpload(newFiles);
    },
    [uploadedFiles, onImageUpload]
  );

  return (
    <div className={className}>
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-all duration-300 ${
          dragActive
            ? "border-accent-500 bg-accent-50"
            : "border-gray-300 hover:border-accent-400"
        }`}>
        <CardBody
          className="p-8 text-center"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}>
          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                dragActive ? "bg-accent-500 text-white" : "bg-gray-100 text-gray-500"
              }`}>
              <FiUpload className="text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Drop images here or click to upload
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Supports JPG, PNG, WebP up to 10MB each
              </p>
              <input
                type="file"
                multiple
                accept={acceptedTypes.join(",")}
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <Button
                as="label"
                htmlFor="file-upload"
                className="bg-accent-500 text-white hover:bg-accent-600 cursor-pointer"
                startContent={<FiImage />}>
                Choose Files
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            Uploaded Images ({uploadedFiles.length}/{maxFiles})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  className="absolute -top-2 -right-2 bg-red-500 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onPress={() => removeFile(index)}>
                  <FiX />
                </Button>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
