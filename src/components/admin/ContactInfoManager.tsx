"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Avatar,
} from "@heroui/react";
import { FiSave, FiUser, FiEdit, FiX, FiCamera } from "react-icons/fi";
import { useContactStore } from "@/store/zustand/contactStore";

export default function ContactInfoManager() {
  // Use contact store instead of local state
  const {
    contactInfo,
    ownerInfo,
    businessInfo,
    isLoading,
    error: storeError,
    fetchContactInfo,
    fetchOwnerInfo,
    fetchBusinessInfo,
  } = useContactStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Form states
  const [guideName, setGuideName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [ownerImageFile, setOwnerImageFile] = useState<File | null>(null);
  const [ownerImagePreview, setOwnerImagePreview] = useState<string>("");

  // Fetch data using store
  useEffect(() => {
    fetchContactInfo();
    fetchOwnerInfo();
    fetchBusinessInfo();
  }, [fetchContactInfo, fetchOwnerInfo, fetchBusinessInfo]);

  // Update error state from store
  useEffect(() => {
    if (storeError) {
      setError(storeError);
    }
  }, [storeError]);

  // Set form values when owner info is loaded
  useEffect(() => {
    if (ownerInfo) {
      setGuideName(ownerInfo.name || "");
      setPhone(ownerInfo.phone || "");
      setEmail(ownerInfo.email || "");
      setWhatsapp(ownerInfo.whatsapp || "");
      setLine(ownerInfo.line || "");

      // Set address from business info
      if (businessInfo?.address) {
        const addressStr =
          typeof businessInfo.address === "string"
            ? businessInfo.address
            : `${businessInfo.address.street}, ${businessInfo.address.city}`;
        setAddress(addressStr);
      }

      // Set owner image preview if available
      if (ownerInfo.avatar) {
        setOwnerImagePreview(ownerInfo.avatar);
      }
    }
  }, [ownerInfo, businessInfo]);

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
  };

  const handleCancel = () => {
    console.log("handleCancel called_____________________________________-");
    setIsEditing(false);
    setError("");
    // Reset form values
    if (ownerInfo) {
      setGuideName(ownerInfo.name);
      setPhone(ownerInfo.phone);
      setEmail(ownerInfo.email);
      setWhatsapp(ownerInfo.whatsapp || "");
    }
    const addressInfo = contactInfo.find((info) => info.type === "address");
    setAddress(addressInfo?.value || "");

    // Reset image upload states
    setOwnerImageFile(null);
    setOwnerImagePreview("");
  };

  // Handle owner image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setOwnerImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setOwnerImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setError(""); // Clear any previous errors
    }
  };

  const handleSave = async () => {
    console.log("handleSave called");
    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      // Validation
      if (!guideName.trim()) {
        setError("Guide name is required");
        return;
      }
      if (!phone.trim()) {
        setError("Phone number is required");
        return;
      }
      if (!email.trim()) {
        setError("Email address is required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      // DEMO MODE: Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage(
        "Contact information updated successfully! (Demo mode - changes not persisted)"
      );
      setTimeout(() => setSuccessMessage(""), 3000);

      // Exit edit mode
      setIsEditing(false);

      // Clear image upload states
      setOwnerImageFile(null);
    } catch (err) {
      setError("Failed to update contact information");
      console.error("Error updating data:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 font-medium">{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Guide Information */}
      <Card className="bg-white">
        <CardHeader className="flex gap-3">
          <FiUser className="text-2xl text-primary-600" />
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-md font-semibold text-gray-900">
                  Guide Information
                </p>
                <p className="text-base text-default-500">
                  Manage guide profile and contact details
                </p>
              </div>
              {!isEditing && (
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<FiEdit />}
                  onPress={handleEdit}
                  size="md">
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          {!isEditing ? (
            // Display Mode
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar
                  src={ownerInfo?.avatar || "/owner-photo.jpg"}
                  alt={ownerInfo?.name || "Guide"}
                  className="w-20 h-20"
                  fallback={<FiUser size={32} />}
                />
                <div>
                  <h3 className="text-xl font-medium text-gray-900">
                    {ownerInfo?.name || "Guide Name"}
                  </h3>
                  <p className="text-gray-700">Licensed Tour Operator</p>
                  <p className="text-base text-gray-600">
                    TAT License No. 21/01279
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    {ownerInfo?.phone || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">
                    {ownerInfo?.email || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    WhatsApp
                  </label>
                  <p className="text-gray-900">
                    {ownerInfo?.whatsapp || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    LINE ID
                  </label>
                  <p className="text-gray-900">
                    {ownerInfo?.line || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <p className="text-gray-900">{address || "Not set"}</p>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
              {/* Owner Image Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <Avatar
                      src={
                        ownerImagePreview ||
                        ownerInfo?.avatar ||
                        "/owner-photo.jpg"
                      }
                      alt={guideName || "Guide"}
                      className="w-24 h-24"
                      fallback={<FiUser size={40} />}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Owner Profile Image
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload a professional photo for the owner profile.
                      Recommended size: 400x400px
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="owner-image-upload"
                      />
                      <Button
                        as="label"
                        htmlFor="owner-image-upload"
                        startContent={<FiCamera />}
                        className="cursor-pointer text-white bg-accent-600"
                        isDisabled={isSaving}>
                        {ownerImageFile ? "Change Image" : "Upload Image"}
                      </Button>
                      {ownerImageFile && (
                        <Button
                          variant="light"
                          color="danger"
                          size="sm"
                          onPress={() => {
                            setOwnerImageFile(null);
                            setOwnerImagePreview("");
                          }}>
                          Remove
                        </Button>
                      )}
                    </div>
                    {isSaving && (
                      <p className="text-sm text-blue-600 mt-2">Saving...</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Guide Name"
                  value={guideName}
                  onChange={(e) => setGuideName(e.target.value)}
                  placeholder="Enter guide name"
                  required
                  size="lg"
                />

                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+66 (0) 95 102 9528"
                  required
                  size="lg"
                />

                <Input
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@example.com"
                  type="email"
                  required
                  size="lg"
                />

                <Input
                  label="WhatsApp Number"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+66 (0) 95 102 9528"
                  size="lg"
                />
                <Input
                  label="Line ID"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  placeholder="Enter line id"
                  size="lg"
                />
                <Input
                  label="Business Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Chiang Mai, Thailand"
                  size="lg"
                />
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
            </div>
          )}
        </CardBody>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="bg-white">
          <CardBody className="text-center py-8">
            <p className="text-gray-600">Loading contact information...</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
