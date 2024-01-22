// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfigBase = {
//   reactStrictMode: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
// };

// const nextConfigCustom = {
//   images: {
//     domains: ['res.cloudinary.com', 'randomuser.me'],
//   },
//   experimental: {
//     reactRoot: true,
//     suppressHydrationWarning: true,
//   },
// };

// module.exports = {
//   ...nextConfigBase,
//   ...nextConfigCustom,
// };

// next.config.js
const path = require('path');
const nextConfigBase = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
},
};


const nextConfigCustom = {
  images: {
    domains: ['res.cloudinary.com', 'randomuser.me'],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

module.exports = {
  ...nextConfigBase,
  ...nextConfigCustom,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
