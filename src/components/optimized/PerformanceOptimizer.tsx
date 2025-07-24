"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizer({
  children,
}: PerformanceOptimizerProps) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch critical routes
    const prefetchRoutes = ["/contact", "/our-services", "/customers"];

    prefetchRoutes.forEach((route) => {
      router.prefetch(route);
    });

    // Optimize images loading
    optimizeImageLoading();

    // Optimize fonts
    optimizeFonts();

    // Optimize third-party scripts
    optimizeThirdPartyScripts();

    // Enable service worker for caching
    enableServiceWorker();
  }, [router]);

  const optimizeImageLoading = () => {
    // Preload critical images
    const criticalImages = ["/image/home/other3.jpg", "/image/logo/40028.png"];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Lazy load non-critical images
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove("lazy");
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all lazy images
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  };

  const optimizeFonts = () => {
    // Preload critical fonts
    const criticalFonts = [
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    ];

    criticalFonts.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = href;
      link.onload = () => {
        link.rel = "stylesheet";
      };
      document.head.appendChild(link);
    });
  };

  const optimizeThirdPartyScripts = () => {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll("script[src]");
    scripts.forEach((script) => {
      if (!script.hasAttribute("async") && !script.hasAttribute("defer")) {
        script.setAttribute("defer", "");
      }
    });
  };

  const enableServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }
  };

  return <>{children}</>;
}

// Hook for component-level performance optimization
export const useComponentOptimization = (componentName: string) => {
  const [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    // Optimize component rendering
    const optimizeComponent = () => {
      // Use requestIdleCallback for non-critical updates
      if ("requestIdleCallback" in window) {
        (
          window as Window & {
            requestIdleCallback: (callback: () => void) => void;
          }
        ).requestIdleCallback(() => {
          // Perform non-critical operations here
        });
      }

      // Use requestAnimationFrame for visual updates
      requestAnimationFrame(() => {
        const endTime = performance.now();
        setRenderTime(endTime - startTime);

        if (process.env.NODE_ENV === "development") {
          console.log(
            `${componentName} optimized render: ${(endTime - startTime).toFixed(
              2
            )}ms`
          );
        }
      });
    };

    optimizeComponent();
  }, [componentName]);

  return { renderTime };
};

// Critical resource preloader
export const preloadCriticalResources = () => {
  const resources = [
    { href: "/image/home/other3.jpg", as: "image", type: "image/jpeg" },
    { href: "/image/logo/40028.png", as: "image", type: "image/png" },
    { href: "/api/contact-info", as: "fetch", type: "application/json" },
  ];

  resources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = resource.as;
    link.href = resource.href;
    if (resource.type) {
      link.type = resource.type;
    }
    document.head.appendChild(link);
  });
};

// Bundle splitting optimization
export const optimizeBundleSplitting = () => {
  // Dynamic imports for code splitting
  const loadComponent = async (componentPath: string) => {
    try {
      const component = await import(componentPath);
      return component.default;
    } catch (error) {
      console.error(`Failed to load component: ${componentPath}`, error);
      return null;
    }
  };

  return { loadComponent };
};

// Memory optimization
export const useMemoryOptimization = () => {
  useEffect(() => {
    // Clean up event listeners
    const cleanup = () => {
      // Remove unused event listeners
      window.removeEventListener("scroll", () => {});
      window.removeEventListener("resize", () => {});
    };

    // Monitor memory usage
    const monitorMemory = () => {
      if ("memory" in performance) {
        const memory = (
          performance as Performance & {
            memory: {
              usedJSHeapSize: number;
              jsHeapSizeLimit: number;
            };
          }
        ).memory;
        const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

        if (memoryUsage > 0.8) {
          console.warn("High memory usage detected:", memoryUsage);
          // Trigger garbage collection if possible
          if ("gc" in window) {
            (window as Window & { gc: () => void }).gc();
          }
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 30000); // Check every 30 seconds

    return () => {
      cleanup();
      clearInterval(memoryInterval);
    };
  }, []);
};

// Network optimization
export const useNetworkOptimization = () => {
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    // Detect connection type
    if ("connection" in navigator) {
      const connection = (
        navigator as Navigator & {
          connection: {
            effectiveType: string;
            addEventListener: (event: string, handler: () => void) => void;
            removeEventListener: (event: string, handler: () => void) => void;
          };
        }
      ).connection;
      setConnectionType(connection.effectiveType || "unknown");

      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || "unknown");
      };

      connection.addEventListener("change", handleConnectionChange);

      return () => {
        connection.removeEventListener("change", handleConnectionChange);
      };
    }
  }, []);

  // Adjust quality based on connection
  const getOptimalImageQuality = () => {
    switch (connectionType) {
      case "slow-2g":
      case "2g":
        return 30;
      case "3g":
        return 50;
      case "4g":
      default:
        return 75;
    }
  };

  const getOptimalVideoQuality = () => {
    switch (connectionType) {
      case "slow-2g":
      case "2g":
        return "240p";
      case "3g":
        return "480p";
      case "4g":
      default:
        return "720p";
    }
  };

  return {
    connectionType,
    getOptimalImageQuality,
    getOptimalVideoQuality,
  };
};
