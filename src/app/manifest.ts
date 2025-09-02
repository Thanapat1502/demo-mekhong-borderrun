import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Visa Border Run - Professional Visa Extension Service",
    short_name: "Visa Border Run",
    description:
      "Professional border run service from Chiang Mai to Huay Xai, Laos. Daily departures for visa extension with licensed TAT operator.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    categories: ["travel", "business", "lifestyle"],
    lang: "en",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
