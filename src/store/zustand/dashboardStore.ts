import { create } from "zustand";
import contactRequestsData from "@/data/static/contact-requests.json";

// Types for dashboard data
export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalRequests: number;
  newRequests: number;
  monthlyVisitors: number;
  monthlyInquiries: number;
  conversionRate: number;
}

interface DashboardState {
  // Contact Requests
  contactRequests: ContactRequest[];
  recentRequests: ContactRequest[];
  
  // Dashboard Stats
  stats: DashboardStats;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchContactRequests: () => Promise<void>;
  fetchDashboardStats: () => Promise<void>;
  updateRequestStatus: (requestId: string, status: ContactRequest["status"]) => Promise<void>;
  addContactRequest: (request: Omit<ContactRequest, "id" | "created_at" | "updated_at">) => Promise<void>;
  deleteContactRequest: (requestId: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  contactRequests: [],
  recentRequests: [],
  stats: {
    totalRequests: 0,
    newRequests: 0,
    monthlyVisitors: 0,
    monthlyInquiries: 0,
    conversionRate: 0,
  },
  isLoading: false,
  error: null,

  // Fetch contact requests
  fetchContactRequests: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate async loading
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      // Use static data and sort by created_at (newest first)
      const requests = contactRequestsData
        .map((req) => ({
          ...req,
          status: req.status as ContactRequest["status"],
        }))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      // Get recent requests (last 5)
      const recentRequests = requests.slice(0, 5);
      
      set({ 
        contactRequests: requests, 
        recentRequests,
        isLoading: false 
      });
    } catch (error) {
      console.error("Failed to load contact requests:", error);
      set({
        contactRequests: [],
        recentRequests: [],
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load contact requests",
      });
    }
  },

  // Fetch dashboard statistics
  fetchDashboardStats: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Simulate async loading
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      const requests = contactRequestsData;
      const currentDate = new Date();
      
      // Calculate statistics
      const totalRequests = requests.length;
      
      // New requests (created within last 3 days)
      const newRequests = requests.filter((req) => {
        const requestDate = new Date(req.created_at);
        const daysDifference = (currentDate.getTime() - requestDate.getTime()) / (1000 * 3600 * 24);
        return daysDifference <= 3 && req.status === "new";
      }).length;
      
      // Monthly inquiries (current month)
      const monthlyInquiries = requests.filter((req) => {
        const requestDate = new Date(req.created_at);
        return (
          requestDate.getMonth() === currentDate.getMonth() &&
          requestDate.getFullYear() === currentDate.getFullYear()
        );
      }).length;
      
      // Mock monthly visitors (would come from analytics in real app)
      const monthlyVisitors = 1250;
      const conversionRate = monthlyVisitors > 0 ? (monthlyInquiries / monthlyVisitors) * 100 : 0;
      
      const stats: DashboardStats = {
        totalRequests,
        newRequests,
        monthlyVisitors,
        monthlyInquiries,
        conversionRate,
      };
      
      set({ stats, isLoading: false });
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load dashboard stats",
      });
    }
  },

  // Update request status
  updateRequestStatus: async (requestId: string, status: ContactRequest["status"]) => {
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      const { contactRequests, recentRequests } = get();
      
      // Update in main list
      const updatedRequests = contactRequests.map((req) =>
        req.id === requestId
          ? { ...req, status, updated_at: new Date().toISOString() }
          : req
      );
      
      // Update in recent list
      const updatedRecentRequests = recentRequests.map((req) =>
        req.id === requestId
          ? { ...req, status, updated_at: new Date().toISOString() }
          : req
      );
      
      set({
        contactRequests: updatedRequests,
        recentRequests: updatedRecentRequests,
      });
    } catch (error) {
      console.error("Failed to update request status:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to update request status",
      });
    }
  },

  // Add new contact request
  addContactRequest: async (requestData: Omit<ContactRequest, "id" | "created_at" | "updated_at">) => {
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      const newRequest: ContactRequest = {
        ...requestData,
        id: `req-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const { contactRequests } = get();
      const updatedRequests = [newRequest, ...contactRequests];
      const recentRequests = updatedRequests.slice(0, 5);
      
      set({
        contactRequests: updatedRequests,
        recentRequests,
      });
    } catch (error) {
      console.error("Failed to add contact request:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to add contact request",
      });
    }
  },

  // Delete contact request
  deleteContactRequest: async (requestId: string) => {
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      const { contactRequests } = get();
      const updatedRequests = contactRequests.filter((req) => req.id !== requestId);
      const recentRequests = updatedRequests.slice(0, 5);
      
      set({
        contactRequests: updatedRequests,
        recentRequests,
      });
    } catch (error) {
      console.error("Failed to delete contact request:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to delete contact request",
      });
    }
  },
}));
