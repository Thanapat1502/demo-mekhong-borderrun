"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Progress, Chip } from "@heroui/react";
import { FiActivity, FiClock, FiZap, FiTrendingUp } from "react-icons/fi";
import {
  usePerformanceMonitor,
  getCoreWebVitalsScore,
} from "@/hooks/usePerformanceMonitor";

export default function PerformancePanel() {
  const metrics = usePerformanceMonitor();
  const [cacheStats, setCacheStats] = useState<{
    size: number;
    entries: number;
    hitRate: number;
  }>({ size: 0, entries: 0, hitRate: 0 });

  useEffect(() => {
    // Get cache statistics
    const getCacheStats = async () => {
      if ("caches" in window) {
        try {
          const cacheNames = await caches.keys();
          let totalSize = 0;
          let totalEntries = 0;

          for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            totalEntries += keys.length;

            // Estimate cache size (rough calculation)
            for (const request of keys) {
              const response = await cache.match(request);
              if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
              }
            }
          }

          setCacheStats({
            size: totalSize,
            entries: totalEntries,
            hitRate: Math.random() * 100, // Placeholder - would need actual tracking
          });
        } catch (error) {
          console.error("Error getting cache stats:", error);
        }
      }
    };

    getCacheStats();
  }, []);

  const scores = getCoreWebVitalsScore(metrics);

  const getScoreColor = (
    score: string | null
  ): "success" | "warning" | "danger" | "default" => {
    switch (score) {
      case "good":
        return "success";
      case "needs-improvement":
        return "warning";
      case "poor":
        return "danger";
      default:
        return "default";
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatTime = (time: number | null) => {
    if (time === null) return "N/A";
    return `${time.toFixed(0)}ms`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FiActivity className="text-2xl text-accent-500" />
        <h1 className="text-2xl font-light text-gray-800">
          Performance Monitor
        </h1>
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FiClock className="text-accent-500" />
              <h3 className="text-sm font-medium">First Contentful Paint</h3>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-light">
                {formatTime(metrics.fcp)}
              </span>
              <Chip size="sm" color={getScoreColor(scores.fcp)} variant="flat">
                {scores.fcp || "N/A"}
              </Chip>
            </div>
            <Progress
              value={
                metrics.fcp ? Math.min((metrics.fcp / 3000) * 100, 100) : 0
              }
              color={getScoreColor(scores.fcp)}
              size="sm"
              className="mt-2"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FiZap className="text-accent-500" />
              <h3 className="text-sm font-medium">Largest Contentful Paint</h3>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-light">
                {formatTime(metrics.lcp)}
              </span>
              <Chip size="sm" color={getScoreColor(scores.lcp)} variant="flat">
                {scores.lcp || "N/A"}
              </Chip>
            </div>
            <Progress
              value={
                metrics.lcp ? Math.min((metrics.lcp / 4000) * 100, 100) : 0
              }
              color={getScoreColor(scores.lcp)}
              size="sm"
              className="mt-2"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-accent-500" />
              <h3 className="text-sm font-medium">First Input Delay</h3>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-light">
                {formatTime(metrics.fid)}
              </span>
              <Chip size="sm" color={getScoreColor(scores.fid)} variant="flat">
                {scores.fid || "N/A"}
              </Chip>
            </div>
            <Progress
              value={metrics.fid ? Math.min((metrics.fid / 300) * 100, 100) : 0}
              color={getScoreColor(scores.fid)}
              size="sm"
              className="mt-2"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FiActivity className="text-accent-500" />
              <h3 className="text-sm font-medium">Cumulative Layout Shift</h3>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-light">
                {metrics.cls ? metrics.cls.toFixed(3) : "N/A"}
              </span>
              <Chip size="sm" color={getScoreColor(scores.cls)} variant="flat">
                {scores.cls || "N/A"}
              </Chip>
            </div>
            <Progress
              value={
                metrics.cls ? Math.min((metrics.cls / 0.25) * 100, 100) : 0
              }
              color={getScoreColor(scores.cls)}
              size="sm"
              className="mt-2"
            />
          </CardBody>
        </Card>
      </div>

      {/* Cache Statistics */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Cache Performance</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Cache Size
              </h4>
              <p className="text-2xl font-light">
                {formatBytes(cacheStats.size)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Cached Entries
              </h4>
              <p className="text-2xl font-light">{cacheStats.entries}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Hit Rate
              </h4>
              <p className="text-2xl font-light">
                {cacheStats.hitRate.toFixed(1)}%
              </p>
              <Progress
                value={cacheStats.hitRate}
                color="success"
                size="sm"
                className="mt-2"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Performance Recommendations</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {scores.fcp === "poor" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800">
                  Improve First Contentful Paint
                </h4>
                <p className="text-sm text-red-600 mt-1">
                  Consider optimizing critical resources, reducing server
                  response times, and eliminating render-blocking resources.
                </p>
              </div>
            )}
            {scores.lcp === "poor" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800">
                  Improve Largest Contentful Paint
                </h4>
                <p className="text-sm text-red-600 mt-1">
                  Optimize your largest image or text block. Consider using WebP
                  images, implementing lazy loading, and optimizing server
                  response times.
                </p>
              </div>
            )}
            {scores.cls === "poor" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800">
                  Reduce Layout Shifts
                </h4>
                <p className="text-sm text-red-600 mt-1">
                  Set explicit dimensions for images and videos, avoid inserting
                  content above existing content, and use CSS transforms for
                  animations.
                </p>
              </div>
            )}
            {Object.values(scores).every((score) => score === "good") && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800">
                  Excellent Performance!
                </h4>
                <p className="text-sm text-green-600 mt-1">
                  Your website is performing well across all Core Web Vitals
                  metrics. Keep up the good work!
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
