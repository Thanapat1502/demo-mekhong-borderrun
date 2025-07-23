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
import { FiSave, FiUser, FiEdit, FiX } from "react-icons/fi";
import { supabase, TABLES, ContactInfoRow, OwnerInfoRow } from "@/lib/supabase";

export default function ContactInfoManager() {
  const [contactInfo, setContactInfo] = useState<ContactInfoRow[]>([]);
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfoRow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Form states
  const [guideName, setGuideName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  // Fetch data from Supabase
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch contact info
      const { data: contactData, error: contactError } = await supabase
        .from(TABLES.CONTACT_INFO)
        .select("*")
        .eq("is_public", true);

      if (contactError) {
        console.error("Contact info error:", contactError);
        if (contactError.code === "42P01") {
          console.log("Contact info table doesn't exist, using mock data");
          setContactInfo([]);
        } else {
          throw contactError;
        }
      } else {
        setContactInfo(contactData || []);
      }

      // Fetch owner info
      const { data: ownerData, error: ownerError } = await supabase
        .from(TABLES.OWNER_INFO)
        .select("*")
        .limit(1)
        .single();

      if (
        ownerError &&
        ownerError.code !== "PGRST116" &&
        ownerError.code !== "42P01"
      ) {
        throw ownerError;
      }

      // Use mock data if table doesn't exist
      if (ownerError && ownerError.code === "42P01") {
        console.log("Owner info table doesn't exist, using mock data");
        const mockOwnerData = {
          id: "mock-owner-1",
          name: "Mekong Border Run Guide",
          title: "Licensed Tour Operator",
          email: "info@mekong-borderrun.com",
          phone: "+66 (0) 95 102 9528",
          whatsapp: "+66 (0) 95 102 9528",
          line: null,
          avatar: null,
          bio: null,
          experience: null,
          languages: null,
          certifications: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setOwnerInfo(mockOwnerData);
        setGuideName(mockOwnerData.name);
        setPhone(mockOwnerData.phone);
        setEmail(mockOwnerData.email);
        setWhatsapp(mockOwnerData.whatsapp || "");
        setAddress("Chiang Mai, Thailand");
      } else if (ownerData) {
        setOwnerInfo(ownerData);
        setGuideName(ownerData.name);
        setPhone(ownerData.phone);
        setEmail(ownerData.email);
        setWhatsapp(ownerData.whatsapp || "");

        // Set address from contact info
        const addressInfo = contactData?.find(
          (info) => info.type === "address"
        );
        setAddress(addressInfo?.value || "");
      }
    } catch (err) {
      setError("Failed to fetch contact information");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
  };

  const handleCancel = () => {
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
  };

  const handleSave = async () => {
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

      // Check if this is mock data
      if (ownerInfo && ownerInfo.id === "mock-owner-1") {
        console.log("Updating mock owner data");
        // Update the local state for mock data
        const updatedOwnerInfo = {
          ...ownerInfo,
          name: guideName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim() || null,
          updated_at: new Date().toISOString(),
        };
        setOwnerInfo(updatedOwnerInfo);
        setSuccessMessage(
          "Contact information updated successfully! (Note: Using mock data - Supabase tables don't exist)"
        );
        setTimeout(() => setSuccessMessage(""), 5000);
        setIsEditing(false);
        return;
      }

      // Update or create owner info
      if (ownerInfo) {
        const { error: ownerError } = await supabase
          .from(TABLES.OWNER_INFO)
          .update({
            name: guideName.trim(),
            phone: phone.trim(),
            email: email.trim(),
            whatsapp: whatsapp.trim() || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", ownerInfo.id);

        if (ownerError) throw ownerError;
      } else {
        const { error: ownerError } = await supabase
          .from(TABLES.OWNER_INFO)
          .insert({
            name: guideName.trim(),
            title: "Licensed Tour Operator",
            phone: phone.trim(),
            email: email.trim(),
            whatsapp: whatsapp.trim() || null,
          });

        if (ownerError) throw ownerError;
      }

      // Update address in contact info
      const addressInfo = contactInfo.find((info) => info.type === "address");
      if (addressInfo) {
        const { error: addressError } = await supabase
          .from(TABLES.CONTACT_INFO)
          .update({
            value: address.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", addressInfo.id);

        if (addressError) throw addressError;
      } else if (address.trim()) {
        const { error: addressError } = await supabase
          .from(TABLES.CONTACT_INFO)
          .insert({
            type: "address",
            label: "Business Address",
            value: address.trim(),
            is_public: true,
          });

        if (addressError) throw addressError;
      }

      setSuccessMessage("Contact information updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      // Refresh data and exit edit mode
      await fetchData();
      setIsEditing(false);
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
      <Card>
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
                  size="sm">
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
                    Address
                  </label>
                  <p className="text-gray-900">{address || "Not set"}</p>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className="space-y-6">
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
              </div>

              <Input
                label="Business Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Chiang Mai, Thailand"
                size="lg"
              />

              <div className="flex gap-3">
                <Button
                  color="primary"
                  size="lg"
                  startContent={<FiSave />}
                  onPress={handleSave}
                  isLoading={isSaving}
                  className="flex-1">
                  Save Changes
                </Button>

                <Button
                  color="default"
                  variant="bordered"
                  size="lg"
                  startContent={<FiX />}
                  onPress={handleCancel}
                  disabled={isSaving}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardBody className="text-center py-8">
            <p className="text-gray-600">Loading contact information...</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
