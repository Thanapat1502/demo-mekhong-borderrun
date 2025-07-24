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
import { supabase, TABLES, ServicePackageRow } from "@/lib/supabase";

export default function ServicePricingManager() {
  const [packages, setPackages] = useState<ServicePackageRow[]>([]);
  const [editingPackage, setEditingPackage] =
    useState<ServicePackageRow | null>(null);
  const [price, setPrice] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch packages from Supabase
  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching service packages...");
      const { data, error } = await supabase
        .from(TABLES.SERVICE_PACKAGES)
        .select("*")
        .order("created_at", { ascending: false });

      console.log("Service packages result:", { data, error });

      if (error) {
        console.error("Service packages error:", error);
        // If table doesn't exist, create mock data
        if (error.code === "42P01") {
          console.log("Service packages table doesn't exist, using mock data");
          const mockPackage = {
            id: "mock-1",
            name: "Border Run Service",
            price: 1500,
            currency: "THB",
            description: "Professional border run service to Myanmar",
            features: [
              "Professional driver",
              "All documentation",
              "Same day return",
            ],
            duration: "1 day",
            max_passengers: 4,
            is_popular: true,
            is_available: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setPackages([mockPackage]);
          setIsLoading(false);
          return;
        }
        throw error;
      }
      setPackages(data || []);
    } catch (err) {
      setError(`Failed to fetch packages: ${err}`);
      console.error("Error fetching packages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEdit = (pkg: ServicePackageRow) => {
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
      console.log("check for id", editingPackage.id);

      const { error } = await supabase
        .from(TABLES.SERVICE_PACKAGES)
        .update({
          price: numericPrice,
          name: name.trim(),
          description: description.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingPackage.id);

      if (error) {
        console.error("Update error:", error);
        throw error;
      }

      setSuccessMessage("Package updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      // Refresh packages and reset form
      await fetchPackages();
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
        <Card>
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
        <Card>
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
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-gray-600">Loading packages...</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
