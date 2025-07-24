"use client";
import { useEffect } from "react";
import CustomersHero from "@/components/customers/CustomersHero";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerReviews from "@/components/customers/CustomerReviews";
import TestimonialHighlight from "@/components/customers/TestimonialHighlight";
import WhyChooseUs from "@/components/customers/WhyChooseUs";
import SharedCTASection from "@/components/shared/SharedCTASection";
import { useReviewStore } from "@/store/zustand/reviewStore";

export default function Customers() {
  const { reviews, highlight, fetchReviews, fetchHighlight } = useReviewStore();

  // Fetch customer reviews data on page load
  useEffect(() => {
    fetchReviews();
    fetchHighlight(); // Fetch highlight review (first customer)
  }, [fetchReviews, fetchHighlight]);

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
      <TestimonialHighlight item={highlight || undefined} />
      <WhyChooseUs />
      <SharedCTASection
        subtitle="Experience the same professional service that our customers love"
        primaryButtonText="Book Your Trip"
        backgroundColor="bg-primary-800">
        Join Our Happy Customers
      </SharedCTASection>
    </div>
  );
}
