/**
 * Recorta un retrato cuadrado para usar como avatar redondo.
 *
 * Resuelve dos casos:
 *
 * 1. Fotos con el aro celeste incrustado. Las de testimonios del sitio actual
 *    vienen con un marco circular celeste pintado en el pixel, sobre fondo
 *    blanco y con sombra. El aro se detecta por color y de ahi salen centro y
 *    radio; el recorte se limita a lo que entra en el circulo de la foto.
 *
 * 2. Fotos normales. Sin aro, el limite es el borde de la imagen.
 *
 * El componente muestra el resultado con rounded-full, asi que lo que se ve es
 * el circulo inscripto en el cuadrado: las esquinas se descartan y por eso
 * pueden caer sobre el aro sin que moleste. La condicion real, entonces, es
 * que ese circulo inscripto quede adentro del circulo de la foto, y eso da un
 * radio maximo simple: radio del aro menos la distancia del foco al centro.
 *
 * --focus mueve el recorte a la cara de quien habla. Sin foco, un plano
 * general se vuelve ilegible en un avatar de 56px.
 *
 * Uso:
 *   node scripts/crop-avatar.mjs <entrada> <salida> [--focus=fx,fy] [--size=n] [--zoom=f]
 *
 *   --focus  centro del recorte en fracciones del ancho y alto (ej 0.4,0.31).
 *            Por defecto, el centro del aro o de la imagen.
 *   --size   lado del archivo de salida en pixeles (512 por defecto).
 *   --zoom   fraccion del recorte maximo posible (1 por defecto).
 */
import sharp from "sharp";

const args = process.argv.slice(2);
const [input, output] = args.filter((a) => !a.startsWith("--"));
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : fallback;
};
if (!input || !output) {
  console.error("uso: node scripts/crop-avatar.mjs <entrada> <salida> [--focus=fx,fy] [--size=n] [--zoom=f]");
  process.exit(1);
}
const SIZE = Number(opt("size", 512));
const ZOOM = Number(opt("zoom", 1));
const MARGIN = 0.97; // 3% adentro del aro, para que el antialias no deje celeste

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const at = (x, y) => {
  const i = (y * W + x) * C;
  return [data[i], data[i + 1], data[i + 2]];
};
// El aro es celeste claro y corrido hacia el azul; el fondo es blanco y la
// foto, en general, ni una cosa ni la otra.
const isRing = ([r, g, b]) => b > r + 40 && b > 150 && g > r + 15 && r < 220;

let x0 = W, y0 = H, x1 = -1, y1 = -1, n = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (!isRing(at(x, y))) continue;
    n++;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
}
// Que haya pixeles celestes no alcanza: un cielo, un cartel o un stand azul
// tambien los tienen. Lo que distingue a un aro es la forma. Se le exige que
// su caja sea cuadrada, que toque los cuatro puntos medios de esa caja (un
// circulo inscripto lo hace) y que las cuatro esquinas queden libres (un
// circulo nunca las alcanza). Una mancha dispersa no cumple las tres.
const bw = x1 - x0, bh = y1 - y0;
const mx = Math.round((x0 + x1) / 2), my = Math.round((y0 + y1) / 2);
const hasRing =
  n > 1000 &&
  bw > W * 0.5 &&
  Math.abs(bw - bh) / Math.max(bw, bh) < 0.05 &&
  [[mx, y0], [mx, y1], [x0, my], [x1, my]].every(([x, y]) => isRing(at(x, y))) &&
  [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].every(([x, y]) => !isRing(at(x, y)));

let cx, cy, limit, geom;
if (hasRing) {
  cx = (x0 + x1) / 2;
  cy = (y0 + y1) / 2;
  const outerR = Math.min(x1 - x0, y1 - y0) / 2;
  // Ancho de la banda: desde el borde exterior hacia el centro, por cuatro
  // rayos, contando cuanto dura el celeste. Se toma la mediana.
  const bands = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => {
    let run = 0;
    for (let t = 2; t < outerR; t++) {
      const x = Math.round(cx + dx * (outerR - t));
      const y = Math.round(cy + dy * (outerR - t));
      if (isRing(at(x, y))) run = t;
      else if (run > 0) break;
    }
    return run;
  }).sort((a, b) => a - b);
  const band = (bands[1] + bands[2]) / 2;
  limit = (outerR - band) * MARGIN;
  geom = `aro ${Math.round(outerR)}px banda ${Math.round(band)}px`;
} else {
  cx = W / 2;
  cy = H / 2;
  limit = null;
  geom = "sin aro";
}

const focusArg = opt("focus", null);
let fx = cx, fy = cy;
if (focusArg) {
  const [a, b] = focusArg.split(",").map(Number);
  fx = a * W;
  fy = b * H;
}

let half;
if (hasRing) {
  // El circulo que se ve (centro en el foco, radio = medio lado) tiene que
  // entrar en el circulo de la foto.
  const dist = Math.hypot(fx - cx, fy - cy);
  half = (limit - dist) * ZOOM;
  if (half <= 0) {
    console.error(`${input}: el foco cae fuera del circulo de la foto`);
    process.exit(1);
  }
} else {
  half = (Math.min(W, H) / 2) * ZOOM;
}

// Encajar el cuadrado dentro de la imagen sin deformarlo.
half = Math.min(half, W / 2, H / 2);
let left = Math.round(Math.min(Math.max(fx - half, 0), W - half * 2));
let top = Math.round(Math.min(Math.max(fy - half, 0), H - half * 2));
const side = Math.round(half * 2);

await sharp(input)
  .extract({ left, top, width: side, height: side })
  .resize(SIZE, SIZE)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output);

console.log(
  `  ${input.split(/[\/]/).pop().slice(0, 42).padEnd(44)}${W}x${H}  ${geom}` +
  `  ->  ${side}x${side} en ${left},${top}  ->  ${output.split(/[\/]/).pop()} ${SIZE}px`
);
