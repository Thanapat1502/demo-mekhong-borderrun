"use client";

import { useEffect } from "react";
import { useWebConfigStore } from "@/store/zustand/webConfigStore";

interface WebConfigProviderProps {
  children: React.ReactNode;
}

export default function WebConfigProvider({ children }: WebConfigProviderProps) {
  const { fetchWebConfig } = useWebConfigStore();

  useEffect(() => {
    // Fetch web config on app entry
    fetchWebConfig();
  }, [fetchWebConfig]);

  return <>{children}</>;
}
