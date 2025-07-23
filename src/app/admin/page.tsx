"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  FiSettings,
  FiImage,
  FiDollarSign,
  FiPhone,
  FiHome,
  FiMessageSquare,
  FiPlus,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import ImageGallery from "@/components/admin/ImageGallery";
import ImageMigrationTool from "@/components/admin/ImageMigrationTool";
import CustomerReviewManager from "@/components/admin/CustomerReviewManager";

import ServicePricingManager from "@/components/admin/ServicePricingManager";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ContactInfoManager from "@/components/admin/ContactInfoManager";
import { useContentStore } from "@/store/zustand/contentStore";
import { heroImages } from "@/data/images/heroImage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeImageCategory, setActiveImageCategory] = useState("hero");
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await signOut();
    }
  };

  // Get image data from Zustand stores
  const {
    // heroImages,
    journeyImages,
    pickupPointImages,
    galleryImages,
    // fetchHeroImages,
    fetchJourneyImages,
    fetchPickupPointImages,
    fetchGalleryImages,
  } = useContentStore();

  // Admin store for CRUD operations will be added later

  // Fetch all data on component mount
  useEffect(() => {
    // fetchHeroImages();
    fetchJourneyImages();
    fetchPickupPointImages();
    fetchGalleryImages();
  }, [
    // fetchHeroImages,
    fetchJourneyImages,
    fetchPickupPointImages,
    fetchGalleryImages,
  ]);

  // Transform data for admin display
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

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "images", label: "Manage Images", icon: FiImage },
    { id: "reviews", label: "Customer Reviews", icon: FiMessageSquare },
    { id: "pricing", label: "Service Pricing", icon: FiDollarSign },
    { id: "contact", label: "Contact Info", icon: FiPhone },
    { id: "settings", label: "Settings", icon: FiSettings },
  ];

  const imageCategories = [
    { id: "hero", label: "Hero Images", count: imageData.hero.length },
    { id: "journey", label: "Journey Images", count: imageData.journey.length },
    { id: "pickup", label: "Pickup Points", count: imageData.pickup.length },
    { id: "gallery", label: "Gallery", count: imageData.gallery.length },
  ];

  // Image management handlers
  const handleImageUpload = (files: File[]) => {
    console.log("Uploading files:", files);
    // In real app, upload to server and update imageData
  };

  interface ImageItem {
    id: string;
    src: string;
    name: string;
    size?: string;
    uploadDate?: string;
  }

  const handleImageEdit = (image: ImageItem) => {
    console.log("Editing image:", image);
    // In real app, open edit modal
  };

  const handleImageDelete = (imageId: string) => {
    setImageData((prev: ImageData) => ({
      ...prev,
      [activeImageCategory]: prev[
        activeImageCategory as keyof ImageData
      ].filter((img: ImageDataItem) => img.id !== imageId),
    }));
  };

  const handleImageView = (image: ImageItem) => {
    console.log("Viewing image:", image);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiSettings className="text-2xl text-accent-600" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Admin Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {/* User Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiUser />
                  <span>{user?.email}</span>
                </div>

                {/* Navigation Buttons */}
                <Button
                  as={Link}
                  href="/"
                  variant="flat"
                  startContent={<FiHome />}
                  size="sm">
                  Website
                </Button>

                <Button
                  onPress={handleLogout}
                  color="danger"
                  variant="flat"
                  startContent={<FiLogOut />}
                  size="sm">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Navigation
                  </h2>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-2">
                    {menuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                            activeTab === item.id
                              ? "bg-accent-500 text-white shadow-md"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}>
                          <IconComponent className="text-lg" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "dashboard" && <AdminDashboard />}

              {activeTab === "images" && (
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
                        tab: "px-4 py-2 text-sm font-medium",
                        tabContent: "group-data-[selected=true]:text-white",
                      }}>
                      {imageCategories.map((category) => (
                        <Tab
                          key={category.id}
                          title={
                            <div className="flex items-center gap-2">
                              <span>{category.label}</span>
                              <span className="group-data-[selected=true]:bg-white/20 group-data-[selected=true]:text-white bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
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
              )}

              {activeTab === "reviews" && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Customer Reviews
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <CustomerReviewManager />
                  </CardBody>
                </Card>
              )}

              {activeTab === "pricing" && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Service Pricing
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <ServicePricingManager />
                  </CardBody>
                </Card>
              )}

              {activeTab === "contact" && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Contact Information
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <ContactInfoManager />
                  </CardBody>
                </Card>
              )}

              {activeTab === "settings" && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-800">
                      General Settings
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-medium text-blue-800 mb-2">
                          🚀 Coming Soon
                        </h3>
                        <p className="text-blue-700">
                          Additional settings and configuration options will be
                          available in future updates.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
