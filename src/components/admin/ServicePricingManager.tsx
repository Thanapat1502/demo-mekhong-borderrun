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
import { FiSave, FiDollarSign, FiEdit, FiX } from "react-icons/fi";
import { usePackageStore } from "@/store/zustand/packageStore";

export default function ServicePricingManager() {
  // Use package store instead of local state
  const {
    packages,
    isLoading,
    error: storeError,
    fetchPackages,
  } = usePackageStore();

  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [price, setPrice] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch packages using store
  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Update error state from store
  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setPrice(pkg.price.toString());
    setName(pkg.name);
    setDescription(pkg.description);
  };

  const handleCancel = () => {
    setEditingPackage(null);
    setPrice("");
    setName("");
    setDescription("");
    setError("");
  };

  const handleSave = async () => {
    if (!editingPackage) return;

    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        setError("Please enter a valid price");
        return;
      }

      if (!name.trim()) {
        setError("Package name is required");
        return;
      }
      // DEMO MODE: Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccessMessage(
        "Package updated successfully! (Demo mode - changes not persisted)"
      );
      setTimeout(() => setSuccessMessage(""), 3000);

      // Reset form
      handleCancel();
    } catch (err) {
      setError(`Failed to update package: ${err}`);
      console.error("Error updating package:", err);
    } finally {
      setIsSaving(false);
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
      {currentPackage && !editingPackage && (
        <Card className="bg-white">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                Current Service Package
              </h3>
              <Button
                color="primary"
                variant="flat"
                startContent={<FiEdit />}
                onPress={() => handleEdit(currentPackage)}
                size="md">
                Edit
              </Button>
            </div>
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

      {/* Edit Package Form */}
      {editingPackage && (
        <Card className="bg-white">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Service Package
              </h3>
              <Button
                color="danger"
                variant="flat"
                startContent={<FiX />}
                onPress={handleCancel}
                size="sm">
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Package Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter package name"
                required
                size="lg"
              />

              <Input
                label="Service Price (THB)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                startContent={<FiDollarSign className="text-gray-400" />}
                type="number"
                min="0"
                step="1"
                required
                size="lg"
              />
            </div>

            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter package description"
              size="lg"
            />

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

            <div className="flex gap-3">
              <Button
                color="success"
                size="lg"
                startContent={<FiSave />}
                onPress={handleSave}
                isLoading={isSaving}
                className="flex-1 bg-green-600 text-white hover:bg-green-700">
                Save Changes
              </Button>

              <Button
                color="default"
                variant="bordered"
                size="lg"
                startContent={<FiX />}
                onPress={handleCancel}
                disabled={isSaving}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card className="bg-white">
          <CardBody className="text-center py-8">
            <p className="text-gray-600">Loading packages...</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
