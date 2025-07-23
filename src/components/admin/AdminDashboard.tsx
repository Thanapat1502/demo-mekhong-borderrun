"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip,
  Avatar,
  Button,
} from "@heroui/react";
import {
  FiUsers,
  FiMessageSquare,
  FiImage,
  FiPackage,
  FiTrendingUp,
  FiMail,
  FiPhone,
  FiStar,
  FiMapPin,
} from "react-icons/fi";
import { useContentStore } from "@/store/zustand/contentStore";
import { useReviewStore } from "@/store/zustand/reviewStore";
import { usePackageStore } from "@/store/zustand/packageStore";
import { useContactStore } from "@/store/zustand/contactStore";

interface DashboardStats {
  totalImages: number;
  totalReviews: number;
  totalPackages: number;
  averageRating: number;
  recentActivity: ActivityItem[];
  popularPackage: string;
  contactRequests: number;
}

interface ActivityItem {
  id: string;
  type: "review" | "image" | "package" | "contact";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalImages: 0,
    totalReviews: 0,
    totalPackages: 0,
    averageRating: 0,
    recentActivity: [],
    popularPackage: "",
    contactRequests: 0,
  });

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

  const { reviews, fetchReviews } = useReviewStore();
  const { packages, fetchPackages } = usePackageStore();
  const { ownerInfo, fetchContactInfo, fetchOwnerInfo } = useContactStore();

  useEffect(() => {
    // Fetch all data
    fetchHeroImages();
    fetchJourneyImages();
    fetchPickupPointImages();
    fetchGalleryImages();
    fetchReviews();
    fetchPackages();
    fetchContactInfo();
    fetchOwnerInfo();
  }, [
    fetchHeroImages,
    fetchJourneyImages,
    fetchPickupPointImages,
    fetchGalleryImages,
    fetchReviews,
    fetchPackages,
    fetchContactInfo,
    fetchOwnerInfo,
  ]);

  useEffect(() => {
    // Calculate stats
    const totalImages =
      heroImages.length +
      journeyImages.length +
      pickupPointImages.length +
      galleryImages.length;
    const totalReviews = reviews.length;
    const totalPackages = packages.length;

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    const popularPackage =
      packages.find((pkg) => pkg.isPopular)?.name ||
      packages[0]?.name ||
      "Border Run Service";

    // Generate recent activity
    const recentActivity: ActivityItem[] = [
      {
        id: "1",
        type: "review",
        title: "New Customer Review",
        description: `${reviews[0]?.name || "Anonymous"} left a ${
          reviews[0]?.rating || 5
        }-star review`,
        timestamp: "2 hours ago",
        icon: <FiStar className="text-yellow-500" />,
      },
      {
        id: "2",
        type: "image",
        title: "Images Updated",
        description: `${totalImages} images are currently active`,
        timestamp: "1 day ago",
        icon: <FiImage className="text-blue-500" />,
      },
      {
        id: "3",
        type: "package",
        title: "Package Pricing",
        description: `${totalPackages} service packages available`,
        timestamp: "2 days ago",
        icon: <FiPackage className="text-green-500" />,
      },
      {
        id: "4",
        type: "contact",
        title: "Contact Information",
        description: "Owner profile and contact details updated",
        timestamp: "3 days ago",
        icon: <FiPhone className="text-purple-500" />,
      },
    ];

    setStats({
      totalImages,
      totalReviews,
      totalPackages,
      averageRating,
      recentActivity,
      popularPackage,
      contactRequests: Math.floor(Math.random() * 15) + 5, // Simulated
    });
  }, [
    heroImages,
    journeyImages,
    pickupPointImages,
    galleryImages,
    reviews,
    packages,
  ]);

  const statCards = [
    {
      title: "Total Images",
      value: stats.totalImages,
      icon: <FiImage className="text-blue-500" size={24} />,
      color: "bg-blue-50",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Customer Reviews",
      value: stats.totalReviews,
      icon: <FiMessageSquare className="text-green-500" size={24} />,
      color: "bg-green-50",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Service Packages",
      value: stats.totalPackages,
      icon: <FiPackage className="text-purple-500" size={24} />,
      color: "bg-purple-50",
      change: "0%",
      changeType: "positive" as const,
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      icon: <FiStar className="text-yellow-500" size={24} />,
      color: "bg-yellow-50",
      change: "+0.2",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardBody className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {ownerInfo?.name || "Admin"}!
              </h1>
              <p className="text-blue-100">
                Here&apos;s what&apos;s happening with your Mekong Border Run
                business today.
              </p>
            </div>
            <Avatar
              src={ownerInfo?.avatar || "/owner-photo.jpg"}
              alt={ownerInfo?.name || "Admin"}
              className="w-16 h-16"
              fallback={<FiUsers size={24} />}
            />
          </div>
        </CardBody>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <Chip
                  size="sm"
                  color={
                    stat.changeType === "positive"
                      ? "success"
                      : stat.changeType === "negative"
                      ? "danger"
                      : "default"
                  }
                  variant="flat">
                  {stat.change}
                </Chip>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-base text-gray-600">{stat.title}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-blue-500" />
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-gray-100">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <p className="text-base text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-base text-gray-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Business Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-green-500" />
              <h3 className="text-lg font-semibold">Business Overview</h3>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Popular Package</p>
                <p className="text-base text-green-700">{stats.popularPackage}</p>
              </div>
              <FiPackage className="text-green-600" size={24} />
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Contact Requests</p>
                <p className="text-base text-blue-700">This month</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {stats.contactRequests}
                </p>
                <FiMail className="text-blue-600 ml-auto" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span>Customer Satisfaction</span>
                <span>{(stats.averageRating * 20).toFixed(0)}%</span>
              </div>
              <Progress
                value={stats.averageRating * 20}
                color="success"
                className="max-w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span>Content Completeness</span>
                <span>
                  {Math.min(
                    100,
                    (stats.totalImages +
                      stats.totalReviews +
                      stats.totalPackages) *
                      5
                  )}
                  %
                </span>
              </div>
              <Progress
                value={Math.min(
                  100,
                  (stats.totalImages +
                    stats.totalReviews +
                    stats.totalPackages) *
                    5
                )}
                color="primary"
                className="max-w-full"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="flat"
              color="primary"
              startContent={<FiImage />}
              className="h-16">
              Manage Images
            </Button>
            <Button
              variant="flat"
              color="success"
              startContent={<FiMessageSquare />}
              className="h-16">
              View Reviews
            </Button>
            <Button
              variant="flat"
              color="warning"
              startContent={<FiPackage />}
              className="h-16">
              Edit Packages
            </Button>
            <Button
              variant="flat"
              color="secondary"
              startContent={<FiUsers />}
              className="h-16">
              Owner Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
