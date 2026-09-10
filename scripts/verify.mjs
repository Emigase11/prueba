/**
 * Compila y verifica el sitio SIN tocar el servidor de desarrollo.
 *
 * El problema que resuelve: `next dev` y `next build` escriben los dos en
 * .next. Si se compila mientras el servidor de desarrollo esta sirviendo, los
 * chunks que el navegador tiene referenciados desaparecen y la pagina que
 * estabas mirando muere con "ChunkLoadError: Loading chunk ... failed".
 * Tambien queda roto el propio build, con MODULE_NOT_FOUND sobre
 * .next/server/webpack-runtime.js.
 *
 * Este script compila en una carpeta aparte (.next-verify, via NEXT_DIST_DIR)
 * y levanta el servidor en un puerto propio, asi el `npm run dev` de siempre
 * puede seguir corriendo en el 3000 o donde sea sin enterarse.
 *
 * Uso:
 *   npm run verify              compila, revisa enlaces y anclas
 *   npm run verify:lh           ademas corre Lighthouse
 *   node scripts/verify.mjs --port=3200 --keep
 *
 *   --lighthouse  corre Lighthouse sobre las paginas de lighthouserc.json
 *   --port=n      puerto del servidor de verificacion (3100 por defecto)
 *   --keep        deja el servidor levantado al terminar, para revisar a mano
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const NEXT_BIN = require.resolve("next/dist/bin/next");
const ROOT = path.resolve(import.meta.dirname, "..");

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const value = (n, d) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.split("=")[1] : d;
};

const PORT = Number(value("port", 3100));
const DIST = ".next-verify";
const BASE = `http://localhost:${PORT}`;
const env = { ...process.env, NEXT_DIST_DIR: DIST };

const run = (cmd, cmdArgs, opts = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, { cwd: ROOT, env, stdio: "inherit", ...opts });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${path.basename(cmd)} ${cmdArgs.join(" ")} -> salida ${code}`))
    );
  });

/** En Windows child.kill() deja vivo al proceso hijo de npm/next: hay que matar el arbol. */
function killTree(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
}

async function waitForServer(timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE, { signal: AbortSignal.timeout(3000) });
      // Un 500 significa que el servidor arranco pero la compilacion esta rota.
      if (res.status >= 500) throw new Error(`el servidor responde HTTP ${res.status}`);
      if (res.ok) return;
    } catch (err) {
      if (String(err.message).includes("responde HTTP")) throw err;
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`el servidor no respondio en ${BASE}`);
}

/**
 * Lighthouse en dos pasos: primero se recolecta, despues se evalua.
 *
 * En Windows `lhci autorun` se cae con EPERM al borrar la carpeta temporal de
 * Chrome. No es un fallo de la auditoria —ya termino cuando pasa— sino de la
 * limpieza: chrome-launcher hace rmSync mientras Chrome todavia tiene abiertos
 * sus archivos. Pasarle --user-data-dir no lo evita, porque chrome-launcher
 * crea la suya igual.
 *
 * Como el error llega despues del trabajo util, alcanza con reintentar y, si el
 * informe ya quedo escrito, darlo por bueno. Por eso se corre `lighthouse` por
 * pagina y recien despues `lhci assert`, que lee los informes guardados y
 * aplica los umbrales de lighthouserc.json. Los umbrales siguen definidos en un
 * solo lugar, que es lo que importa que no se duplique.
 */
async function lighthouse() {
  const LH_BIN = require.resolve("lighthouse/cli/index.js");
  const LHCI_BIN = require.resolve("@lhci/cli/src/cli.js");
  const OUT = path.join(ROOT, ".lighthouseci");
  const rc = require(path.join(ROOT, "lighthouserc.json"));
  const preset = rc.ci.collect.settings?.preset;

  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const configured of rc.ci.collect.url) {
    // Se conserva la ruta y se reemplaza el origen: en CI el sitio vive en el
    // 3000 y aca en el puerto de verificacion.
    const url = `${BASE}${new URL(configured).pathname}`;
    const out = path.join(OUT, `lhr-${Date.now()}.json`);
    let ok = false;
    for (let intento = 1; intento <= 3 && !ok; intento++) {
      try {
        await run(
          process.execPath,
          [
            LH_BIN, url, "--quiet", "--output=json", `--output-path=${out}`,
            ...(preset ? [`--preset=${preset}`] : []),
            "--chrome-flags=--headless=new --no-sandbox",
          ],
          { stdio: "ignore" }
        );
        ok = true;
      } catch {
        // El informe se escribe antes de que falle la limpieza: si el archivo
        // esta, la auditoria sirve igual.
        ok = existsSync(out);
        if (!ok) console.log(`  ${url}: intento ${intento} fallido, reintentando`);
      }
    }
    if (!ok) throw new Error(`no se pudo auditar ${url}`);
    console.log(`  auditada ${url}`);
  }

  console.log("");
  await run(process.execPath, [LHCI_BIN, "assert"]);
}

let server;
const stop = () => killTree(server);
process.on("SIGINT", () => { stop(); process.exit(130); });

try {
  console.log(`\n> compilando en ${DIST}/ (no toca .next)\n`);
  await rm(path.join(ROOT, DIST), { recursive: true, force: true });
  await run(process.execPath, [NEXT_BIN, "build"]);

  console.log(`\n> levantando el sitio en ${BASE}\n`);
  server = spawn(process.execPath, [NEXT_BIN, "start", "--port", String(PORT)], {
    cwd: ROOT,
    env,
    stdio: "ignore",
  });
  await waitForServer();

  console.log("> revisando enlaces y anclas\n");
  await run(process.execPath, [path.join(ROOT, "scripts", "check-links.mjs"), BASE]);

  if (flag("lighthouse")) {
    console.log("\n> Lighthouse\n");
    await lighthouse();
  }

  console.log("\nTodo en orden.");
  if (flag("keep")) {
    console.log(`El servidor sigue en ${BASE}. Ctrl+C para cortarlo.`);
    await new Promise(() => {});
  }
} catch (err) {
  console.error(`\nFallo la verificacion: ${err.message}`);
  process.exitCode = 1;
} finally {
  if (!flag("keep")) stop();
}
