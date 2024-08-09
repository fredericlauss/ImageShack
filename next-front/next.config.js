const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Votre configuration Next.js existante ici (si vous avez des configurations spécifiques)
};

module.exports = withPWA(nextConfig);
