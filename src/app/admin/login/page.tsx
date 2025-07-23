import { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login - Mekong Border Run",
  description: "Admin panel login for Mekong Border Run management system",
  robots: "noindex, nofollow", // Prevent search engines from indexing admin pages
};

export default function AdminLoginPage() {
  return <LoginForm />;
}
