"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import { FiUser, FiCheck, FiX } from "react-icons/fi";
import { authService } from "@/services/authService";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/scripts/setupAdmin";

export default function AdminSetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [setupStatus, setSetupStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSetup = async () => {
    setIsLoading(true);
    setSetupStatus("idle");
    setMessage("");

    try {
      // First, try to sign in to see if user already exists
      const signInResult = await authService.signIn({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (signInResult.user) {
        setSetupStatus("success");
        setMessage("Admin user already exists and is working correctly!");
        return;
      }

      // If sign in failed, try to create the user
      const createResult = await authService.createAdminUser(
        ADMIN_EMAIL,
        ADMIN_PASSWORD
      );

      if (createResult.error) {
        setSetupStatus("error");
        setMessage(`Failed to create admin user: ${createResult.error}`);
        return;
      }

      setSetupStatus("success");
      setMessage(
        "Admin user created successfully! You can now access the admin panel."
      );
    } catch {
      setSetupStatus("error");
      setMessage("An unexpected error occurred during setup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-accent-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Setup</h1>
          <p className="text-gray-600">
            Initialize the admin user for Mekong Border Run
          </p>
        </div>

        {/* Setup Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-accent-600" size={32} />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Admin User Setup
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Create the admin user for the management panel
              </p>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            {/* Admin Credentials Display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">
                Admin Credentials
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-mono text-gray-900">{ADMIN_EMAIL}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Password:</span>
                  <span className="font-mono text-gray-900">
                    {ADMIN_PASSWORD}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Message */}
            {message && (
              <div
                className={`p-4 rounded-lg border ${
                  setupStatus === "success"
                    ? "bg-green-50 border-green-200"
                    : setupStatus === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-200"
                }`}>
                <div className="flex items-center gap-2">
                  {setupStatus === "success" && (
                    <FiCheck className="text-green-600" />
                  )}
                  {setupStatus === "error" && <FiX className="text-red-600" />}
                  <p
                    className={`text-sm ${
                      setupStatus === "success"
                        ? "text-green-600"
                        : setupStatus === "error"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}>
                    {message}
                  </p>
                </div>
              </div>
            )}

            {/* Setup Button */}
            <Button
              color="primary"
              size="lg"
              className="w-full"
              onPress={handleSetup}
              isLoading={isLoading}
              disabled={isLoading}>
              {isLoading ? "Setting up..." : "Create Admin User"}
            </Button>

            <Divider />

            {/* Instructions */}
            <div className="text-center space-y-3">
              <h4 className="font-medium text-gray-900">Next Steps</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>1. Click &quot;Create Admin User&quot; above</p>
                <p>
                  2. Go to{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    /admin
                  </span>
                </p>
                <p>3. Sign in with the credentials shown</p>
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Security Note:</strong> This setup page should be
                removed or protected in production. The admin credentials are
                displayed here for initial setup only.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Mekong Border Run. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
