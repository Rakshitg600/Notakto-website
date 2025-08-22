/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    optimizeCss: false, // ✅ disable lightningcss to fix build error
  },
  compress: true,
  webpack: (config, { isServer, dev }) => {
    if (!process.env.TURBOPACK) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    } else {
      console.log('Using Turbopack, skipping custom webpack config.');
    }
    return config;
  },
};

export default nextConfig;
