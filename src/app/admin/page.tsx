"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import {
  FiSettings,
  FiImage,
  FiDollarSign,
  FiPhone,
  FiHome,
  FiMessageSquare,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import AdminDashboard from "@/components/admin/AdminDashboard";
import {
  ImagesManagementPanel,
  CustomerReviewsPanel,
  ServicePricingPanel,
  ContactInfoPanel,
  SettingsPanel,
} from "@/components/admin/panels";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, signOut } = useAuth();

  // Demo mode: Use static user data if no authenticated user
  const demoUser = {
    email: "admin@demo.com",
    id: "demo-admin",
    role: "admin",
  };

  const currentUser = user || demoUser;

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      if (user) {
        await signOut();
      } else {
        // Demo mode: redirect to login page
        window.location.href = "/admin/login";
      }
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "images", label: "Manage Images", icon: FiImage },
    { id: "reviews", label: "Customer Reviews", icon: FiMessageSquare },
    { id: "pricing", label: "Service Pricing", icon: FiDollarSign },
    { id: "contact", label: "Contact Info", icon: FiPhone },
    { id: "settings", label: "Settings", icon: FiSettings },
  ];

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
                <div className="flex items-center gap-2 text-base text-gray-600">
                  <FiUser />
                  <span>{currentUser?.email}</span>
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

              {activeTab === "images" && <ImagesManagementPanel />}

              {activeTab === "reviews" && <CustomerReviewsPanel />}

              {activeTab === "pricing" && <ServicePricingPanel />}

              {activeTab === "contact" && <ContactInfoPanel />}

              {activeTab === "settings" && <SettingsPanel />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
