"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Chip,
} from "@heroui/react";
import {
  FiUsers,
  FiMail,
  FiTrendingUp,
  FiEye,
  FiMessageSquare,
  FiDollarSign,
  FiSettings,
} from "react-icons/fi";
import StatusDropdown, {
  DEFAULT_CONTACT_STATUS_OPTIONS,
} from "@/components/admin/StatusDropdown";
import ServicePricingManager from "./ServicePricingManager";
import ContactInfoManager from "./ContactInfoManager";
import {
  useDashboardStore,
  type ContactRequest,
  type DashboardStats,
} from "@/store/zustand/dashboardStore";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Use dashboard store
  const {
    stats,
    recentRequests,
    isLoading,
    error,
    fetchContactRequests,
    fetchDashboardStats,
    updateRequestStatus,
  } = useDashboardStore();

  // Handle status updates using dashboard store
  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    await updateRequestStatus(requestId, newStatus as ContactRequest["status"]);
  };

  // Fetch dashboard data using store
  useEffect(() => {
    fetchContactRequests();
    fetchDashboardStats();
  }, [fetchContactRequests, fetchDashboardStats]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your border run service</p>
        </div>
        <Button
          color="primary"
          variant="flat"
          startContent={<FiSettings />}
          onPress={() => setActiveTab("settings")}>
          Settings
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary-500",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary-600",
        }}>
        <Tab
          key="overview"
          title={
            <div className="flex items-center space-x-2">
              <FiTrendingUp />
              <span>Business Overview</span>
            </div>
          }>
          <div className="space-y-6 mt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white">
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FiUsers className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalRequests}
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-white">
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <FiMail className="text-red-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">New Requests</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.newRequests}
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-white">
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FiEye className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Visitors</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.monthlyVisitors}
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-white">
                <CardBody className="flex flex-row items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FiTrendingUp className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.conversionRate.toFixed(1)}%
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Recent Contact Requests */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Contact Requests
                  </h3>
                  <Chip color="primary" variant="flat" size="sm">
                    {recentRequests.length} requests
                  </Chip>
                </div>
              </CardHeader>
              <CardBody>
                {isLoading ? (
                  <p className="text-gray-600 text-center py-4">
                    Loading requests...
                  </p>
                ) : recentRequests.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">
                    No contact requests yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recentRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-900">
                              {request.name}
                            </h4>
                            <StatusDropdown
                              className="text-gray-700 bg-white"
                              currentStatus={request.status}
                              statusOptions={DEFAULT_CONTACT_STATUS_OPTIONS}
                              onStatusChange={(newStatus) =>
                                handleStatusUpdate(request.id, newStatus)
                              }
                              isLoading={false}
                              size="sm"
                              showCurrentAsChip={true}
                            />
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {request.email}
                          </p>
                          {request.phone && (
                            <p className="text-sm text-gray-600 mb-1">
                              {request.phone}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {request.message}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-sm text-gray-500">
                            {formatDate(request.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab
          key="pricing"
          title={
            <div className="flex items-center space-x-2">
              <FiDollarSign />
              <span>Service Pricing</span>
            </div>
          }>
          <div className="mt-6">
            <ServicePricingManager />
          </div>
        </Tab>

        <Tab
          key="contact"
          title={
            <div className="flex items-center space-x-2">
              <FiMessageSquare />
              <span>Contact Info</span>
            </div>
          }>
          <div className="mt-6">
            <ContactInfoManager />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
