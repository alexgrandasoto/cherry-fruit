/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
	optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  async rewrites() {
	return [
	  {
		source: '/api/:path*',
		destination: 'http://localhost:4000/api/:path*', // Proxy to backend running on port 4000
	  },
	];
  },
};

export default nextConfig;