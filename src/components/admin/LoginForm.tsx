"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
} from "@heroui/react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Basic validation
      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      if (!password.trim()) {
        setError("Password is required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      const result = await signIn(email, password);

      if (result.error) {
        setError(result.error);
      } else {
        // Redirect to admin dashboard on successful login
        router.push("/admin");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-accent-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mekong Border Run
          </h1>
          <p className="text-gray-600">Admin Panel</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-base mt-1">
                Sign in to access the admin panel
              </p>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-base">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email Address"
                placeholder="admin@mekong-borderrun.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<FiMail className="text-gray-400" />}
                variant="bordered"
                size="lg"
                isRequired
                autoComplete="email"
              />

              <Input
                type={isPasswordVisible ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={<FiLock className="text-gray-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-600">
                    {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
                  </button>
                }
                variant="bordered"
                size="lg"
                isRequired
                autoComplete="current-password"
              />

              <Button
                type="submit"
                color="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <Divider />

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-base text-gray-500">
                For security purposes, only authorized administrators can access
                this panel.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-base text-gray-500">
            © 2024 Mekong Border Run. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
