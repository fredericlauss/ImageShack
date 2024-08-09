const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration Next.js existante ici (si vous avez des configurations spécifiques)
};

module.exports = withPWA(nextConfig);
