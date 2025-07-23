"use client";
import { useEffect } from "react";
import CustomersHero from "@/components/customers/CustomersHero";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerReviews from "@/components/customers/CustomerReviews";
import TestimonialHighlight from "@/components/customers/TestimonialHighlight";
import WhyChooseUs from "@/components/customers/WhyChooseUs";
import CustomersCTA from "@/components/customers/CustomersCTA";
import { useContentStore } from "@/store/zustand/contentStore";

export default function Customers() {
  const { customerReviews, fetchCustomerReviews } = useContentStore();

  // Fetch customer reviews data on page load
  useEffect(() => {
    fetchCustomerReviews();
  }, [fetchCustomerReviews]);

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
