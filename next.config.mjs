/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // URL de la landing en el WordPress actual -> ruta nueva. Permanente
      // para que buscadores y enlaces de prensa transfieran el posicionamiento.
      { source: "/cmax-air-x2", destination: "/air-x2", permanent: true },
      { source: "/cmax-air-x2/", destination: "/air-x2", permanent: true },
    ];
  },
};

export default nextConfig;
