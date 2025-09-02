import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials - Visa Border Run Service",
  description:
    "Read genuine customer reviews and testimonials for Visa Border Run service. 5-star rated visa extension service from Chiang Mai to Laos with satisfied customers from Australia, UK, USA, Canada, and more.",
  keywords: [
    "border run reviews",
    "customer testimonials",
    "visa service reviews",
    "Visa border run feedback",
    "5 star visa service",
    "customer satisfaction",
    "border run testimonials",
    "visa extension reviews",
    "Chiang Mai service reviews",
    "Thailand Laos border reviews",
    "professional service reviews",
    "TAT licensed reviews",
  ],
  openGraph: {
    title: "Customer Reviews & Testimonials - Mekong Border Run Service",
    description:
      "Read genuine customer reviews and testimonials for Mekong Border Run service. 5-star rated visa extension service.",
    url: "/customers",
    type: "website",
    images: [
      {
        url: "/og-customers.jpg",
        width: 1200,
        height: 630,
        alt: "Customer Reviews - Mekong Border Run Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews & Testimonials - Mekong Border Run Service",
    description:
      "Read genuine customer reviews and testimonials for Mekong Border Run service. 5-star rated visa extension service.",
    images: ["/og-customers.jpg"],
  },
  alternates: {
    canonical: "/customers",
  },
};

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
