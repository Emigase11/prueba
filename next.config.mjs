/** @type {import('next').NextConfig} */
const nextConfig = {
  // Carpeta de salida. `next dev` y `next build` escriben los dos en .next y
  // se pisan: si uno compila mientras el otro esta sirviendo, el navegador
  // pide un chunk que ya no existe y la pagina muere con ChunkLoadError.
  //
  // Por eso las verificaciones compilan aparte, con NEXT_DIST_DIR apuntando a
  // otra carpeta (ver scripts/verify.mjs), y el servidor de desarrollo se
  // queda con .next para el solo.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

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
