import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تحسينات الأداء
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 يوم
  },
  
  // تحسين الحزم
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  
  // ضغط gzip
  compress: true,
  
  // تحسين PoweredByHeader
  poweredByHeader: false,
};

export default nextConfig;
