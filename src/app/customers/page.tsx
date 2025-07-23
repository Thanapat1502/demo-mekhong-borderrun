"use client";
import { useEffect } from "react";
import CustomersHero from "@/components/customers/CustomersHero";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerReviews from "@/components/customers/CustomerReviews";
import TestimonialHighlight from "@/components/customers/TestimonialHighlight";
import WhyChooseUs from "@/components/customers/WhyChooseUs";
import CustomersCTA from "@/components/customers/CustomersCTA";
import { useReviewStore } from "@/store/zustand/reviewStore";

export default function Customers() {
  const { reviews, fetchReviews } = useReviewStore();

  // Fetch customer reviews data on page load
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Transform reviews to match CustomerReviews component interface
  const transformedReviews = reviews.map((review) => ({
    id: review.id,
    name: review.name,
    country: review.country,
    avatar: review.avatar || "/image/avatars/default.jpg",
    rating: review.rating,
    review: review.review,
    date: review.date,
  }));

  return (
    <div className="bg-white min-h-screen">
      <CustomersHero />
      <CustomerStats />
      <CustomerReviews customerReviews={transformedReviews} />
      <TestimonialHighlight />
      <WhyChooseUs />
      <CustomersCTA />
    </div>
  );
}
