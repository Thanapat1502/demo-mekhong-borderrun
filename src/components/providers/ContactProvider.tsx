"use client";

import { useEffect } from "react";
import { useContactStore } from "@/store/zustand/contactStore";

interface ContactProviderProps {
  children: React.ReactNode;
}

export default function ContactProvider({ children }: ContactProviderProps) {
  const { fetchContactInfo, fetchOwnerInfo, fetchBusinessInfo } = useContactStore();

  useEffect(() => {
    // Fetch all contact data on app entry
    const fetchAllContactData = async () => {
      try {
        await Promise.all([
          fetchContactInfo(),
          fetchOwnerInfo(),
          fetchBusinessInfo(),
        ]);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchAllContactData();
  }, [fetchContactInfo, fetchOwnerInfo, fetchBusinessInfo]);

  return <>{children}</>;
}
