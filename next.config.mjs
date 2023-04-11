// ----------------------------------------------------------------------

const nextConfig = {
  // presets: ["next/babel"],
  reactStrictMode: true,
  trailingSlash: true,
  // env: {
  //   DEV_API: process.env.BACKEND_URL,
  //   // PRODUCTION_API: '',
  //   GOOGLE_API: '',
  // },
  images: {
    domains: ["dstage.mypinata.cloud", "www.pexels.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(
  //     new webpack.IgnorePlugin({
  //       resourceRegExp: /^electron$/,
  //     })
  //   );
  //   return config;
  // },
};

export default nextConfig;
