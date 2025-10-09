// next.config.ts
import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // indicamos dónde está el App Router ahora
    appDir: "src/app",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

// casteamos al exportar para evitar el error de propiedades extra
export default nextConfig as NextConfig;
