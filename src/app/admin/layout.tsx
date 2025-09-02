import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Visa Border Run",
  description:
    "Admin interface for managing Visa Border Run website content, pricing, and contact information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
