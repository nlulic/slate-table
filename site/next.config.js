/** @type {import('next').NextConfig} */
const { version } = require("../package.json");

const nextConfig = {
  output: "export",
  env: {
    PACKAGE_VERSION: version,
  },
};

module.exports = nextConfig;
