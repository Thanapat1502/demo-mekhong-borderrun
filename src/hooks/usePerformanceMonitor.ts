"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Function to get navigation timing
    const getNavigationTiming = () => {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        setMetrics((prev) => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart,
        }));
      }
    };

    // Function to observe performance entries
    const observePerformance = () => {
      if ("PerformanceObserver" in window) {
        // Observe paint metrics (FCP)
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
            }
          }
        });
        paintObserver.observe({ entryTypes: ["paint"] });

        // Observe LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // Observe FID
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as PerformanceEventTiming;
            setMetrics((prev) => ({
              ...prev,
              fid: fidEntry.processingStart - entry.startTime,
            }));
          }
        });
        fidObserver.observe({ entryTypes: ["first-input"] });

        // Observe CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const clsEntry = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value: number;
            };
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
              setMetrics((prev) => ({ ...prev, cls: clsValue }));
            }
          }
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });

        return () => {
          paintObserver.disconnect();
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      }
    };

    // Get initial navigation timing
    getNavigationTiming();

    // Start observing performance
    const cleanup = observePerformance();

    return cleanup;
  }, []);

  return metrics;
};

// Hook for monitoring component render performance
export const useRenderPerformance = (componentName: string) => {
  const [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      setRenderTime(duration);

      // Log performance in development
      if (process.env.NODE_ENV === "development") {
        console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
      }
    };
  }, [componentName]);

  return renderTime;
};

// Hook for monitoring data fetching performance
export const useFetchPerformance = () => {
  const [fetchMetrics, setFetchMetrics] = useState<{
    [key: string]: { duration: number; timestamp: number };
  }>({});

  const trackFetch = async <T>(
    key: string,
    fetchFunction: () => Promise<T>
  ): Promise<T> => {
    const startTime = performance.now();

    try {
      const result = await fetchFunction();
      const endTime = performance.now();
      const duration = endTime - startTime;

      setFetchMetrics((prev) => ({
        ...prev,
        [key]: { duration, timestamp: Date.now() },
      }));

      // Log in development
      if (process.env.NODE_ENV === "development") {
        console.log(`Fetch ${key} completed in ${duration.toFixed(2)}ms`);
      }

      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      setFetchMetrics((prev) => ({
        ...prev,
        [`${key}_error`]: { duration, timestamp: Date.now() },
      }));

      throw error;
    }
  };

  return { fetchMetrics, trackFetch };
};

// Utility function to get Core Web Vitals score
export const getCoreWebVitalsScore = (metrics: PerformanceMetrics) => {
  const scores = {
    fcp: metrics.fcp
      ? metrics.fcp <= 1800
        ? "good"
        : metrics.fcp <= 3000
        ? "needs-improvement"
        : "poor"
      : null,
    lcp: metrics.lcp
      ? metrics.lcp <= 2500
        ? "good"
        : metrics.lcp <= 4000
        ? "needs-improvement"
        : "poor"
      : null,
    fid: metrics.fid
      ? metrics.fid <= 100
        ? "good"
        : metrics.fid <= 300
        ? "needs-improvement"
        : "poor"
      : null,
    cls: metrics.cls
      ? metrics.cls <= 0.1
        ? "good"
        : metrics.cls <= 0.25
        ? "needs-improvement"
        : "poor"
      : null,
  };

  return scores;
};

// Hook for memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ("memory" in performance) {
        const memory = (
          performance as Performance & {
            memory: {
              usedJSHeapSize: number;
              totalJSHeapSize: number;
              jsHeapSizeLimit: number;
            };
          }
        ).memory;
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};
