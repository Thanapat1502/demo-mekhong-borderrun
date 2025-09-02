"use client";

import { useState } from "react";
import { Button, Card, CardBody, Progress } from "@heroui/react";
import { FiUpload, FiCheck, FiX, FiRefreshCw } from "react-icons/fi";
import { ImageUploadService } from "@/services/imageUploadService";
import { useContentStore } from "@/store/zustand/contentStore";
import { useAdminStore } from "@/store/zustand/adminStore";

interface MigrationResult {
  id: string;
  originalUrl: string;
  newUrl?: string;
  status: "pending" | "success" | "error";
  error?: string;
}

export default function ImageMigrationTool() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<MigrationResult[]>([]);
  const [progress, setProgress] = useState(0);

  const {
    heroImages,
    journeyImages,
    pickupPointImages,
    galleryImages,
    fetchHeroImages,
    fetchJourneyImages,
    fetchPickupPointImages,
    fetchGalleryImages,
  } = useContentStore();

  const {
    updateHeroImage,
    updateJourneyImage,
    updatePickupPoint,
    updateGalleryImage,
  } = useAdminStore();

  const getAllLocalImages = () => {
    const images: Array<{
      id: string;
      url: string;
      type: "hero" | "journey" | "pickup" | "gallery";
      category: string;
    }> = [];

    // Hero images
    heroImages.forEach((img) => {
      if (!ImageUploadService.isSupabaseStorageUrl(img.src)) {
        images.push({
          id: img.id,
          url: img.src,
          type: "hero",
          category: "hero",
        });
      }
    });

    // Journey images
    journeyImages.forEach((img) => {
      if (!ImageUploadService.isSupabaseStorageUrl(img.src)) {
        images.push({
          id: img.id,
          url: img.src,
          type: "journey",
          category: "journey",
        });
      }
    });

    // Pickup point images
    pickupPointImages.forEach((img) => {
      if (!ImageUploadService.isSupabaseStorageUrl(img.src)) {
        images.push({
          id: img.id,
          url: img.src,
          type: "pickup",
          category: "pickup",
        });
      }
    });

    // Gallery images
    galleryImages.forEach((img) => {
      if (!ImageUploadService.isSupabaseStorageUrl(img.src)) {
        images.push({
          id: img.id,
          url: img.src,
          type: "gallery",
          category: "gallery",
        });
      }
    });

    return images;
  };

  const migrateImage = async (
    id: string,
    url: string,
    type: "hero" | "journey" | "pickup" | "gallery",
    category: string
  ): Promise<MigrationResult> => {
    try {
      // Migrate the image
      const result = await ImageUploadService.migrateLocalImage(url, category);

      if (!result.success || !result.url) {
        return {
          id,
          originalUrl: url,
          status: "error",
          error: result.error || "Migration failed",
        };
      }

      // Update the database record
      try {
        switch (type) {
          case "hero":
            await updateHeroImage(id, { src: result.url });
            break;
          case "journey":
            await updateJourneyImage(id, { src: result.url });
            break;
          case "pickup":
            await updatePickupPoint(id, { src: result.url });
            break;
          case "gallery":
            await updateGalleryImage(id, { src: result.url });
            break;
        }
      } catch (dbError) {
        return {
          id,
          originalUrl: url,
          status: "error",
          error: `Upload succeeded but database update failed: ${
            dbError instanceof Error ? dbError.message : "Unknown error"
          }`,
        };
      }

      return {
        id,
        originalUrl: url,
        newUrl: result.url,
        status: "success",
      };
    } catch (error) {
      return {
        id,
        originalUrl: url,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const runMigration = async () => {
    setIsRunning(true);
    setResults([]);
    setProgress(0);

    const localImages = getAllLocalImages();

    if (localImages.length === 0) {
      setIsRunning(false);
      return;
    }

    const migrationResults: MigrationResult[] = localImages.map((img) => ({
      id: img.id,
      originalUrl: img.url,
      status: "pending" as const,
    }));

    setResults(migrationResults);

    // Process images one by one
    for (let i = 0; i < localImages.length; i++) {
      const img = localImages[i];

      const result = await migrateImage(
        img.id,
        img.url,
        img.type,
        img.category
      );

      // Update results
      setResults((prev) => prev.map((r) => (r.id === img.id ? result : r)));

      // Update progress
      setProgress(((i + 1) / localImages.length) * 100);
    }

    // Refresh data from database
    await Promise.all([
      fetchHeroImages(),
      fetchJourneyImages(),
      fetchPickupPointImages(),
      fetchGalleryImages(),
    ]);

    setIsRunning(false);
  };

  const localImages = getAllLocalImages();
  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;

  return (
    <Card className="w-full bg-white">
      <CardBody className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Image Migration Tool</h3>
          <p className="text-gray-600 text-base">
            Migrate local images to Supabase Storage. This will upload your
            local images to Supabase and update the database records to use the
            new URLs.
          </p>
        </div>

        {/* Status */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {localImages.length}
            </div>
            <div className="text-base text-blue-600">Local Images</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {successCount}
            </div>
            <div className="text-base text-green-600">Migrated</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <div className="text-base text-red-600">Errors</div>
          </div>
        </div>

        {/* Progress */}
        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-base">
              <span>Migration Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} color="primary" />
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2">
          <Button
            onClick={runMigration}
            disabled={isRunning || localImages.length === 0}
            color="primary"
            startContent={
              isRunning ? (
                <FiRefreshCw className="animate-spin" />
              ) : (
                <FiUpload />
              )
            }>
            {isRunning ? "Migrating..." : "Start Migration"}
          </Button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Migration Results:</h4>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`flex items-center gap-2 p-2 rounded text-base ${
                    result.status === "success"
                      ? "bg-green-50 text-green-700"
                      : result.status === "error"
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-50 text-gray-700"
                  }`}>
                  {result.status === "success" && (
                    <FiCheck className="text-green-600" />
                  )}
                  {result.status === "error" && (
                    <FiX className="text-red-600" />
                  )}
                  {result.status === "pending" && (
                    <FiRefreshCw className="animate-spin text-gray-600" />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="truncate">{result.originalUrl}</div>
                    {result.error && (
                      <div className="text-base text-red-600 mt-1">
                        {result.error}
                      </div>
                    )}
                    {result.newUrl && (
                      <div className="text-base text-green-600 mt-1 truncate">
                        → {result.newUrl}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {localImages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FiCheck className="mx-auto h-12 w-12 mb-2" />
            <p>All images are already using Supabase Storage!</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
