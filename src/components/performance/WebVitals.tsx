"use client";

import { useEffect } from "react";

// Core Web Vitals monitoring component
export default function WebVitals() {
  useEffect(() => {
    // Only run in production and when Web Vitals API is available
    if (
      process.env.NODE_ENV !== "production" ||
      typeof window === "undefined"
    ) {
      return;
    }

    // Dynamic import to avoid loading in development
    import("web-vitals")
      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        // Cumulative Layout Shift
        onCLS((metric) => {
          console.log("CLS:", metric);
          // You can send this to your analytics service
          // analytics.track('Web Vital', {
          //   name: metric.name,
          //   value: metric.value,
          //   id: metric.id,
          // });
        });

        // Interaction to Next Paint (replaces FID)
        onINP((metric) => {
          console.log("INP:", metric);
        });

        // First Contentful Paint
        onFCP((metric) => {
          console.log("FCP:", metric);
        });

        // Largest Contentful Paint
        onLCP((metric) => {
          console.log("LCP:", metric);
        });

        // Time to First Byte
        onTTFB((metric) => {
          console.log("TTFB:", metric);
        });
      })
      .catch((error) => {
        console.warn("Failed to load web-vitals:", error);
      });
  }, []);

  return null; // This component doesn't render anything
}

// Performance observer for additional metrics
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    // Monitor long tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Tasks longer than 50ms
            console.warn("Long task detected:", {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ["longtask"] });

      // Monitor layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (layoutShiftEntry.hadRecentInput) continue; // Ignore user-initiated shifts
          console.log("Layout shift:", {
            value: layoutShiftEntry.value,
            startTime: entry.startTime,
          });
        }
      });
      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });

      return () => {
        longTaskObserver.disconnect();
        layoutShiftObserver.disconnect();
      };
    } catch (error) {
      console.warn("Performance monitoring setup failed:", error);
    }
  }, []);

  return null;
}

// Resource loading performance monitor
export function ResourceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;

        // Log slow resources (>1s)
        if (resource.duration > 1000) {
          console.warn("Slow resource:", {
            name: resource.name,
            duration: resource.duration,
            size: resource.transferSize,
          });
        }

        // Log large resources (>500KB)
        if (resource.transferSize > 500 * 1024) {
          console.warn("Large resource:", {
            name: resource.name,
            size: resource.transferSize,
            duration: resource.duration,
          });
        }
      }
    });

    observer.observe({ entryTypes: ["resource"] });

    return () => observer.disconnect();
  }, []);

  return null;
}
