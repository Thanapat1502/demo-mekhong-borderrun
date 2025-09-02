"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { FiSave, FiLock, FiLogOut, FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useWebConfigStore } from "@/store/zustand/webConfigStore";

export default function SettingsPanel() {
  const router = useRouter();
  const {
    isOpen: isPasswordModalOpen,
    onOpen: onPasswordModalOpen,
    onOpenChange: onPasswordModalOpenChange,
  } = useDisclosure();

  // Web config store
  const { config, isLoading, updateWebConfig } = useWebConfigStore();

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Website settings states (connected to web_config store)
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load settings from web_config store when config changes
  useEffect(() => {
    setWebsiteTitle(config.website_title);
    setWebsiteDescription(config.website_description);
    setBusinessHours(config.business_hours);
    setServiceArea(config.service_area);
  }, [config]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    setIsChangingPassword(true);
    setPasswordError("");

    try {
      // Update password using Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setPasswordError(error.message);
      } else {
        // Success - close modal and reset form
        onPasswordModalOpenChange();
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        alert("Password changed successfully!");
      }
    } catch {
      setPasswordError("An error occurred while changing password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Save all settings to web_config table using the store
      const success = await updateWebConfig({
        website_title: websiteTitle,
        website_description: websiteDescription,
        business_hours: businessHours,
        service_area: serviceArea,
      });

      if (success) {
        alert("Settings saved successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card className="shadow-lg bg-white">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            General Settings
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {/* Website Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Website Settings
              </h3>
              <div className="space-y-4">
                <Input
                  label="Website Title"
                  className="text-gray-800"
                  classNames={{
                    inputWrapper:
                      "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                    input: "bg-white text-black placeholder:text-gray-500",
                    label: "text-gray-700",
                  }}
                  placeholder="Enter website title"
                  value={websiteTitle}
                  onChange={(e) => setWebsiteTitle(e.target.value)}
                  size="lg"
                  // isDisabled={isLoading}
                  disabled={true}
                />
                <Input
                  label="Website Description"
                  className="text-gray-800"
                  classNames={{
                    inputWrapper:
                      "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                    input: "bg-white text-black placeholder:text-gray-500",
                    label: "text-gray-700",
                  }}
                  placeholder="Enter website description"
                  value={websiteDescription}
                  onChange={(e) => setWebsiteDescription(e.target.value)}
                  size="lg"
                  isDisabled={isLoading}
                />
              </div>
            </div>

            <Divider />

            {/* Business Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Business Settings
              </h3>
              <div className="space-y-4">
                <Input
                  label="Business Hours"
                  className="text-gray-800"
                  classNames={{
                    inputWrapper:
                      "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                    input: "bg-white text-black placeholder:text-gray-500",
                    label: "text-gray-700",
                  }}
                  placeholder="Enter business hours"
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  size="lg"
                  isDisabled={isLoading}
                />
                <Input
                  label="Service Area"
                  className="text-gray-800"
                  classNames={{
                    inputWrapper:
                      "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                    input: "bg-white text-black placeholder:text-gray-500",
                    label: "text-gray-700",
                  }}
                  placeholder="Enter service area"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  size="lg"
                  isDisabled={isLoading}
                />
              </div>
            </div>

            <Divider />

            {/* Admin Security */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Admin Security
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    color="warning"
                    variant="flat"
                    startContent={<FiLock />}
                    size="lg"
                    onPress={onPasswordModalOpen}
                    className="flex-1">
                    Change Password
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    startContent={<FiLogOut />}
                    size="lg"
                    onPress={handleLogout}
                    className="flex-1">
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            <Divider />

            {/* Save Settings */}
            <div className="flex justify-end">
              <Button
                color="success"
                size="lg"
                startContent={<FiSave />}
                onPress={handleSaveSettings}
                isLoading={isSaving}
                className="min-w-[200px] bg-green-600 text-white hover:bg-green-700">
                Save Settings
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onOpenChange={onPasswordModalOpenChange}
        placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-800">
                Change Admin Password
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-700 text-sm">{passwordError}</p>
                    </div>
                  )}

                  <Input
                    label="Current Password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    type={showCurrentPassword ? "text" : "password"}
                    classNames={{
                      inputWrapper:
                        "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                      input: "bg-white text-black placeholder:text-gray-500",
                      label: "text-gray-700",
                    }}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }>
                        {showCurrentPassword ? (
                          <FiEyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <FiEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />

                  <Input
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={showNewPassword ? "text" : "password"}
                    classNames={{
                      inputWrapper:
                        "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                      input: "bg-white text-black placeholder:text-gray-500",
                      label: "text-gray-700",
                    }}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? (
                          <FiEyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <FiEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />

                  <Input
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    classNames={{
                      inputWrapper:
                        "bg-white hover:bg-white focus:bg-white data-[hover=true]:bg-white",
                      input: "bg-white text-black placeholder:text-gray-500",
                      label: "text-gray-700",
                    }}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }>
                        {showConfirmPassword ? (
                          <FiEyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <FiEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="bg-accent-600 text-white"
                  onPress={handleChangePassword}
                  isLoading={isChangingPassword}
                  isDisabled={
                    !currentPassword || !newPassword || !confirmPassword
                  }>
                  Change Password
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
