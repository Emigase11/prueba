/**
 * Recorta el retrato de una foto enmarcada en un aro celeste.
 *
 * Las fotos de testimonios del sitio actual vienen con un marco circular
 * celeste incrustado en el pixel, sobre fondo blanco y con sombra. Asi no
 * sirven: el aro no es parte de este diseño y el blanco de alrededor choca
 * con cualquier fondo que no sea blanco.
 *
 * Adentro del aro la foto es un circulo limpio, asi que alcanza con recortar
 * el cuadrado que lo circunscribe. Las esquinas de ese cuadrado quedan sobre
 * el aro, pero se van con el rounded-full del componente.
 *
 * La geometria se detecta, no se asume: se busca el aro por color, de ahi
 * salen centro y radio exterior, y se camina hacia adentro desde el borde
 * para medir el ancho de la banda. El radio interior se achica un 3% para
 * que el antialias del borde redondeado no deje ni un pelo de celeste.
 *
 * Uso:  node scripts/crop-avatar.mjs <entrada.jpg> <salida.jpg> [tamaño]
 */
import sharp from "sharp";

const [input, output, sizeArg] = process.argv.slice(2);
if (!input || !output) {
  console.error("uso: node scripts/crop-avatar.mjs <entrada> <salida> [tamaño]");
  process.exit(1);
}
const SIZE = Number(sizeArg ?? 512);
const MARGIN = 0.97; // 3% adentro del borde del aro

const { data, info } = await sharp(input)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const at = (x, y) => {
  const i = (y * W + x) * C;
  return [data[i], data[i + 1], data[i + 2]];
};
// El aro es celeste claro y saturado hacia el azul; el fondo es blanco y la
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
if (n < 1000) {
  console.error(`${input}: no se encontro el aro celeste (${n} pixeles)`);
  process.exit(1);
}

const cx = (x0 + x1) / 2;
const cy = (y0 + y1) / 2;
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

const innerR = (outerR - band) * MARGIN;
const side = Math.round(innerR * 2);
const left = Math.round(cx - innerR);
const top = Math.round(cy - innerR);

await sharp(input)
  .extract({ left, top, width: side, height: side })
  .resize(SIZE, SIZE)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(output);

console.log(
  `${input.split(/[\/]/).pop()}  ${W}x${H}` +
  `  centro ${Math.round(cx)},${Math.round(cy)}` +
  `  aro ${Math.round(outerR)}px  banda ${Math.round(band)}px` +
  `  ->  recorte ${side}x${side} en ${left},${top}  ->  ${output.split(/[\/]/).pop()} ${SIZE}px`
);
