import type { Metadata } from "next";
import CustomersHero from "@/components/customers/CustomersHero";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerReviews from "@/components/customers/CustomerReviews";
import TestimonialHighlight from "@/components/customers/TestimonialHighlight";
import WhyChooseUs from "@/components/customers/WhyChooseUs";
import CustomersCTA from "@/components/customers/CustomersCTA";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials - Mekong Border Run Service",
  description:
    "Read genuine customer reviews and testimonials for Mekong Border Run service. 5-star rated visa extension service from Chiang Mai to Laos with satisfied customers from Australia, UK, USA, Canada, and more.",
  keywords: [
    "border run reviews",
    "customer testimonials",
    "visa service reviews",
    "Mekong border run feedback",
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
    url: "https://mekong-transfer.vercel.app/customers",
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

const customerReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "Australia",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    review:
      "Excellent service! The driver was professional and the trip was smooth. Made my visa run stress-free.",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Mark Thompson",
    country: "UK",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    review:
      "Highly recommend Mekong Transfer. On time pickup, comfortable vehicle, and great value for money.",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Lisa Chen",
    country: "Canada",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    review:
      "Professional service from start to finish. The White Temple stop was a nice bonus!",
    date: "2024-01-08",
  },
  {
    id: 4,
    name: "David Miller",
    country: "USA",
    avatar: "https://i.pravatar.cc/150?img=7",
    rating: 5,
    review:
      "Smooth border crossing experience. The guide was helpful and knowledgeable throughout the journey.",
    date: "2024-01-05",
  },
  {
    id: 5,
    name: "Emma Wilson",
    country: "New Zealand",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    review:
      "Perfect for visa extension! Everything was handled professionally and efficiently.",
    date: "2024-01-03",
  },
  {
    id: 6,
    name: "James Brown",
    country: "Ireland",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "Great communication, punctual service, and comfortable transport. Will use again!",
    date: "2024-01-01",
  },
];

export default function Customers() {
  return (
    <div className="bg-white min-h-screen">
      <CustomersHero />
      <CustomerStats />
      <CustomerReviews customerReviews={customerReviews} />
      <TestimonialHighlight />
      <WhyChooseUs />
      <CustomersCTA />
    </div>
  );
}
