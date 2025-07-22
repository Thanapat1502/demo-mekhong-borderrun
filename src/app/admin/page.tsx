"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  FiSettings,
  FiImage,
  FiDollarSign,
  FiUser,
  FiPhone,
  FiMail,
  FiSave,
  FiHome,
  FiPlus,
} from "react-icons/fi";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import ImageGallery from "@/components/admin/ImageGallery";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("images");
  const [activeImageCategory, setActiveImageCategory] = useState("hero");
  const [servicePrice, setServicePrice] = useState("4,100");
  const [ownerInfo, setOwnerInfo] = useState({
    name: "Mekong Border Run",
    phone: "+66 95 102 9528",
    email: "mekongborderrun@gmail.com",
    whatsapp: "+66 95 102 9528",
    line: "@mekongborderrun",
  });

  // Sample image data - in real app, this would come from API
  const [imageData, setImageData] = useState({
    hero: [
      {
        id: "1",
        src: "/image/home/other1.jpg",
        name: "hero-1.jpg",
        size: "2.3 MB",
        uploadDate: "2024-01-15",
      },
      {
        id: "2",
        src: "/image/home/other2.jpg",
        name: "hero-2.jpg",
        size: "1.8 MB",
        uploadDate: "2024-01-15",
      },
      {
        id: "3",
        src: "/image/home/other3.jpg",
        name: "hero-3.jpg",
        size: "2.1 MB",
        uploadDate: "2024-01-15",
      },
    ],
    journey: [
      {
        id: "4",
        src: "/image/home/commercial/commercial1.jpg",
        name: "journey-1.jpg",
        size: "1.5 MB",
        uploadDate: "2024-01-16",
      },
      {
        id: "5",
        src: "/image/home/commercial/commercial3.jpg",
        name: "journey-2.jpg",
        size: "1.7 MB",
        uploadDate: "2024-01-16",
      },
      {
        id: "6",
        src: "/image/home/commercial/commercial5.jpg",
        name: "journey-3.jpg",
        size: "1.9 MB",
        uploadDate: "2024-01-16",
      },
      {
        id: "7",
        src: "/image/home/commercial/commercial7.jpeg",
        name: "journey-4.jpeg",
        size: "2.0 MB",
        uploadDate: "2024-01-16",
      },
    ],
    pickup: [
      {
        id: "8",
        src: "/image/home/pickup/tha-pae-gate.jpg",
        name: "tha-pae-gate.jpg",
        size: "1.2 MB",
        uploadDate: "2024-01-17",
      },
      {
        id: "9",
        src: "/image/home/pickup/central.webp",
        name: "central.webp",
        size: "800 KB",
        uploadDate: "2024-01-17",
      },
      {
        id: "10",
        src: "/image/home/pickup/maya.jpg",
        name: "maya.jpg",
        size: "1.1 MB",
        uploadDate: "2024-01-17",
      },
      {
        id: "11",
        src: "/image/home/pickup/downtown1.jpg",
        name: "downtown.jpg",
        size: "1.3 MB",
        uploadDate: "2024-01-17",
      },
      {
        id: "12",
        src: "/image/home/pickup/chiang-mai-gate.webp",
        name: "chiang-mai-gate.webp",
        size: "900 KB",
        uploadDate: "2024-01-17",
      },
    ],
    gallery: [
      {
        id: "13",
        src: "/image/home/commercial/commercial2.jpg",
        name: "gallery-1.jpg",
        size: "1.6 MB",
        uploadDate: "2024-01-18",
      },
      {
        id: "14",
        src: "/image/home/commercial/commercial4.jpg",
        name: "gallery-2.jpg",
        size: "1.8 MB",
        uploadDate: "2024-01-18",
      },
      {
        id: "15",
        src: "/image/home/commercial/commercial6.jpg",
        name: "gallery-3.jpg",
        size: "1.4 MB",
        uploadDate: "2024-01-18",
      },
      {
        id: "16",
        src: "/image/home/commercial/commercial8.jpg",
        name: "gallery-4.jpg",
        size: "1.7 MB",
        uploadDate: "2024-01-18",
      },
      {
        id: "17",
        src: "/image/home/commercial/commercial9.JPG",
        name: "gallery-5.JPG",
        size: "2.2 MB",
        uploadDate: "2024-01-18",
      },
      {
        id: "18",
        src: "/image/home/commercial/commercial10.jpg",
        name: "gallery-6.jpg",
        size: "1.9 MB",
        uploadDate: "2024-01-18",
      },
      {
        id: "19",
        src: "/image/home/white-temple1.jpg",
        name: "white-temple-1.jpg",
        size: "2.0 MB",
        uploadDate: "2024-01-18",
      },
      {
        id: "20",
        src: "/image/home/white-temple2.jpg",
        name: "white-temple-2.jpg",
        size: "1.8 MB",
        uploadDate: "2024-01-18",
      },
    ],
  });

  const menuItems = [
    { id: "images", label: "Manage Images", icon: FiImage },
    { id: "pricing", label: "Service Pricing", icon: FiDollarSign },
    { id: "contact", label: "Owner Info", icon: FiUser },
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
    setImageData((prev) => ({
      ...prev,
      [activeImageCategory]: prev[
        activeImageCategory as keyof typeof prev
      ].filter((img) => img.id !== imageId),
    }));
  };

  const handleImageView = (image: ImageItem) => {
    console.log("Viewing image:", image);
  };

  return (
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
            <Button
              as={Link}
              href="/"
              className="bg-accent-500 text-white hover:bg-accent-600"
              startContent={<FiHome />}>
              Back to Website
            </Button>
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

            {activeTab === "pricing" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Service Pricing
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Border Run Service Price (THB)
                      </label>
                      <Input
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        placeholder="Enter price"
                        startContent={<FiDollarSign />}
                        size="lg"
                        className="max-w-md"
                      />
                    </div>
                    <Divider />
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">
                        Current Pricing Display
                      </h3>
                      <div className="text-3xl font-bold text-accent-600">
                        {servicePrice} THB
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        This price will be displayed across the website
                      </p>
                    </div>
                    <Button
                      className="bg-green-500 text-white hover:bg-green-600"
                      startContent={<FiSave />}>
                      Save Pricing
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}

            {activeTab === "contact" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Owner Contact Information
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Business Name"
                        value={ownerInfo.name}
                        onChange={(e) =>
                          setOwnerInfo({ ...ownerInfo, name: e.target.value })
                        }
                        startContent={<FiUser />}
                      />
                      <Input
                        label="Phone Number"
                        value={ownerInfo.phone}
                        onChange={(e) =>
                          setOwnerInfo({ ...ownerInfo, phone: e.target.value })
                        }
                        startContent={<FiPhone />}
                      />
                      <Input
                        label="Email Address"
                        value={ownerInfo.email}
                        onChange={(e) =>
                          setOwnerInfo({ ...ownerInfo, email: e.target.value })
                        }
                        startContent={<FiMail />}
                      />
                      <Input
                        label="WhatsApp Number"
                        value={ownerInfo.whatsapp}
                        onChange={(e) =>
                          setOwnerInfo({
                            ...ownerInfo,
                            whatsapp: e.target.value,
                          })
                        }
                        startContent={<FiPhone />}
                      />
                      <Input
                        label="LINE ID"
                        value={ownerInfo.line}
                        onChange={(e) =>
                          setOwnerInfo({ ...ownerInfo, line: e.target.value })
                        }
                        className="md:col-span-2"
                      />
                    </div>
                    <Button
                      className="bg-green-500 text-white hover:bg-green-600"
                      startContent={<FiSave />}>
                      Save Contact Info
                    </Button>
                  </div>
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
  );
}
