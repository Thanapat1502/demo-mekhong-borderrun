"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Avatar,
  Divider,
} from "@heroui/react";
import { FiSave, FiUser } from "react-icons/fi";
import SupabaseImageUpload from "./SupabaseImageUpload";

export default function ContactInfoManager() {
  const [guideName, setGuideName] = useState<string>("");
  const [guideImage, setGuideImage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Load current data on component mount
  useEffect(() => {
    // For now, set default values
    // In a real implementation, you would fetch from API
    setGuideName("Mekong Border Run Guide");
    setGuideImage("/owner-photo.jpg");
    setPhone("+66 (0) 95 102 9528");
    setEmail("info@mekong-borderrun.com");
    setWhatsapp("+66 (0) 95 102 9528");
    setAddress("Chiang Mai, Thailand");
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
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
      if (!address.trim()) {
        setError("Address is required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      // For now, just show success message
      // In a real implementation, you would save to API
      setSuccessMessage("Contact information updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setError("Failed to update contact information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setGuideImage(url);
  };

  const handleImageRemove = () => {
    setGuideImage("");
  };

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

      {/* Guide Information */}
      <Card>
        <CardHeader className="flex gap-3">
          <FiUser className="text-2xl" />
          <div className="flex flex-col">
            <p className="text-base font-semibold">Guide Information</p>
            <p className="text-baseall text-default-500">
              Manage guide profile displayed on contact page
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Guide Photo Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar
              src={guideImage || "/owner-photo.jpg"}
              alt={guideName || "Guide"}
              className="w-32 h-32"
              fallback={<FiUser size={48} />}
            />
            <div className="w-full max-w-md">
              <label className="block text-base font-medium mb-2">
                Guide Photo
              </label>
              <SupabaseImageUpload
                currentImageUrl={guideImage}
                category="owner"
                onImageUploaded={handleImageUpload}
                onImageRemoved={handleImageRemove}
              />
              <p className="text-base text-gray-500 mt-2">
                This photo will be displayed on the contact page. Recommended
                size: 400x400px
              </p>
            </div>
          </div>

          <Divider />

          {/* Guide Name Section */}
          <div className="space-y-4">
            <div className="max-w-md">
              <Input
                label="Guide Name"
                value={guideName}
                onChange={(e) => setGuideName(e.target.value)}
                placeholder="Enter guide name"
                required
                size="lg"
                description="This name will be displayed on the contact page"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg max-w-md">
              <h4 className="font-medium text-gray-800 mb-2">Preview</h4>
              <div className="flex items-center gap-3">
                <Avatar
                  src={guideImage || "/owner-photo.jpg"}
                  alt={guideName || "Guide"}
                  className="w-12 h-12"
                  fallback={<FiUser size={20} />}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {guideName || "Guide Name"}
                  </p>
                  <p className="text-base text-gray-600">
                    Licensed Tour Operator
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Contact Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+66 (0) 95 102 9528"
                required
                description="Primary phone number for contact"
              />

              <Input
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@example.com"
                type="email"
                required
                description="Primary email for inquiries"
              />

              <Input
                label="WhatsApp Number"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+66 (0) 95 102 9528"
                description="WhatsApp contact number (optional)"
              />

              <Input
                label="Business Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Chiang Mai, Thailand"
                required
                description="Business location"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-3">
                Contact Preview
              </h5>
              <div className="space-y-2 text-base">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Phone:</span>
                  <span className="text-gray-700">{phone || "Not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span className="text-gray-700">{email || "Not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">WhatsApp:</span>
                  <span className="text-gray-700">{whatsapp || "Not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Address:</span>
                  <span className="text-gray-700">{address || "Not set"}</span>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Save Button */}
          <div>
            <Button
              color="primary"
              size="lg"
              startContent={<FiSave />}
              onPress={handleSave}
              isLoading={isLoading}
              className="w-full md:w-auto">
              Save Contact Information
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Current Contact Display */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            Current Contact Display
          </h3>
        </CardHeader>
        <CardBody>
          <div className="bg-white border rounded-lg p-6">
            {/* Guide Info Section */}
            <div className="flex items-center gap-6 mb-6">
              <Avatar
                src={guideImage || "/owner-photo.jpg"}
                alt={guideName || "Guide"}
                className="w-20 h-20"
                fallback={<FiUser size={32} />}
              />
              <div>
                <h3 className="text-xl font-medium text-black">
                  {guideName || "Mekong Border Run"}
                </h3>
                <p className="text-black">Licensed Tour Operator</p>
                <p className="text-base text-black">TAT License No. 21/01279</p>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 text-base">📞</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Phone</h4>
                  <p className="text-accent-600 font-medium">
                    {phone || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 text-base">💬</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">WhatsApp</h4>
                  <p className="text-accent-600 font-medium">
                    {whatsapp || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 text-base">✉️</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Email</h4>
                  <p className="text-accent-600 font-medium">
                    {email || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 text-base">📍</span>
                </div>
                <div>
                  <h4 className="font-medium text-black">Location</h4>
                  <p className="text-black">{address || "Not set"}</p>
                </div>
              </div>
            </div>

            <p className="text-base text-gray-600 border-t pt-4">
              This is how your contact information will appear on the contact
              page.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
