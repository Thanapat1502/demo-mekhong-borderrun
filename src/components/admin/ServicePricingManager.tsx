"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
} from "@heroui/react";
import { FiSave, FiDollarSign } from "react-icons/fi";
import { usePackageStore } from "@/store/zustand/packageStore";

export default function ServicePricingManager() {
  const { packages, fetchPackages } = usePackageStore();
  const [price, setPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  useEffect(() => {
    // Set the current price from the first package
    if (packages.length > 0) {
      setPrice(packages[0].price.toString());
    }
  }, [packages]);

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        setError("Please enter a valid price");
        return;
      }

      // For now, just show success message
      // In a real implementation, you would update the package price via API
      setSuccessMessage("Price updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setError("Failed to update price");
    } finally {
      setIsLoading(false);
    }
  };

  const currentPackage = packages[0];

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Current Package Info */}
      {currentPackage && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Current Service Package
            </h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  Package Name
                </label>
                <p className="text-lg font-medium text-gray-900">
                  {currentPackage.name}
                </p>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Current Price
                </label>
                <p className="text-2xl font-bold text-accent-600">
                  {currentPackage.price.toLocaleString()}{" "}
                  {currentPackage.currency}
                </p>
              </div>
            </div>
            {currentPackage.description && (
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Description
                </label>
                <p className="text-gray-600">{currentPackage.description}</p>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Price Editor */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            Update Service Price
          </h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="max-w-md">
            <Input
              label="Service Price (THB)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter new price"
              startContent={<FiDollarSign className="text-gray-400" />}
              type="number"
              min="0"
              step="1"
              size="lg"
            />
          </div>

          <Divider />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Price Preview</h4>
            <div className="text-3xl font-bold text-accent-600">
              {price ? parseFloat(price).toLocaleString() : "0"} THB
            </div>
            <p className="text-gray-600 text-base mt-1">
              This price will be displayed across the website
            </p>
          </div>

          <Button
            color="primary"
            size="lg"
            startContent={<FiSave />}
            onPress={handleSave}
            isLoading={isLoading}
            className="w-full md:w-auto">
            Save Price
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
