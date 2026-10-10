/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Coloca o CSS (pequeno, ~11 KB) dentro da própria página, em vez de um
    // arquivo separado que segura a primeira pintura da tela.
    inlineCss: true,
  },
};

export default nextConfig;
