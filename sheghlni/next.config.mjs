/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  /** Must match GitHub repo name: github.com/<user>/Sheghlni */
  basePath: "/Sheghlni",
  trailingSlash: true,
};

export default nextConfig;
