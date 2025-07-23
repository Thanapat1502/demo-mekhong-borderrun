"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@heroui/react";
import { FiPlus } from "react-icons/fi";
import ImageUpload from "@/components/admin/ImageUpload";
import ImageGallery from "@/components/admin/ImageGallery";
import ImageMigrationTool from "@/components/admin/ImageMigrationTool";
import { useContentStore } from "@/store/zustand/contentStore";
import { heroImages } from "@/data/images/heroImage";

interface ImageDataItem {
  id: string;
  src: string;
  name: string;
  size: string;
  uploadDate: string;
}

interface ImageData {
  hero: ImageDataItem[];
  journey: ImageDataItem[];
  pickup: ImageDataItem[];
  gallery: ImageDataItem[];
}

export default function ImagesManagementPanel() {
  const [activeImageCategory, setActiveImageCategory] = useState("hero");

  // Get image data from Zustand stores
  const {
    journeyImages,
    pickupPointImages,
    galleryImages,
    fetchJourneyImages,
    fetchPickupPointImages,
    fetchGalleryImages,
  } = useContentStore();

  // Fetch all data on component mount
  useEffect(() => {
    fetchJourneyImages();
    fetchPickupPointImages();
    fetchGalleryImages();
  }, [fetchJourneyImages, fetchPickupPointImages, fetchGalleryImages]);

  const [imageData, setImageData] = useState<ImageData>({
    hero: [],
    journey: [],
    pickup: [],
    gallery: [],
  });

  // Update image data when store data changes
  useEffect(() => {
    setImageData({
      hero: heroImages.map((img) => ({
        id: img.id,
        src: img.src,
        name: `${img.id}.jpg`,
        size: "2.1 MB", // Default size - in real app would come from file metadata
        uploadDate: "2024-01-15",
      })),
      journey: journeyImages.map((img) => ({
        id: img.id,
        src: img.src,
        name: `${img.id}.jpg`,
        size: "1.8 MB",
        uploadDate: "2024-01-16",
      })),
      pickup: pickupPointImages.map((img) => ({
        id: img.id,
        src: img.src,
        name: `${img.id}.jpg`,
        size: "1.2 MB",
        uploadDate: "2024-01-17",
      })),
      gallery: galleryImages.map((img) => ({
        id: img.id,
        src: img.src,
        name: `${img.id}.jpg`,
        size: "1.8 MB",
        uploadDate: "2024-01-18",
      })),
    });
  }, [heroImages, journeyImages, pickupPointImages, galleryImages]);

  const imageCategories = [
    { id: "hero", label: "Hero Images", count: imageData.hero.length },
    { id: "journey", label: "Journey Images", count: imageData.journey.length },
    { id: "pickup", label: "Pickup Points", count: imageData.pickup.length },
    { id: "gallery", label: "Gallery", count: imageData.gallery.length },
  ];

  // Image management handlers
  const handleImageUpload = (files: File[]) => {
    console.log("Uploading files:", files);
    // TODO: Implement actual upload logic
  };

  const handleImageEdit = (imageId: string) => {
    console.log("Editing image:", imageId);
    // TODO: Implement edit functionality
  };

  const handleImageDelete = (imageId: string) => {
    console.log("Deleting image:", imageId);
    // TODO: Implement delete functionality
  };

  const handleImageView = (imageId: string) => {
    console.log("Viewing image:", imageId);
    // TODO: Implement view functionality
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Images
          </h2>
          <Button
            className="bg-accent-500 text-white hover:bg-accent-600"
            startContent={<FiPlus />}
            size="sm">
            Add New Category
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {/* Image Migration Tool */}
        <div className="mb-6">
          <ImageMigrationTool />
        </div>

        <Divider className="my-6" />

        {/* Category Tabs */}
        <Tabs
          selectedKey={activeImageCategory}
          onSelectionChange={(key) =>
            setActiveImageCategory(key as string)
          }
          className="mb-6"
          color="primary"
          variant="solid"
          classNames={{
            tabList: "bg-gray-100 p-1 rounded-xl",
            cursor: "bg-accent-500",
            tab: "px-4 py-2 text-base font-medium",
            tabContent: "group-data-[selected=true]:text-white",
          }}>
          {imageCategories.map((category) => (
            <Tab
              key={category.id}
              title={
                <div className="flex items-center gap-2">
                  <span>{category.label}</span>
                  <span className="group-data-[selected=true]:bg-white/20 group-data-[selected=true]:text-white bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-base">
                    {category.count}
                  </span>
                </div>
              }>
              <div className="space-y-6">
                {/* Upload Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Upload New Images
                  </h3>
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    maxFiles={10}
                  />
                </div>

                {/* Existing Images */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Current Images ({category.count})
                  </h3>
                  <ImageGallery
                    images={
                      imageData[
                        activeImageCategory as keyof typeof imageData
                      ]
                    }
                    onEdit={handleImageEdit}
                    onDelete={handleImageDelete}
                    onView={handleImageView}
                  />
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      </CardBody>
    </Card>
  );
}
