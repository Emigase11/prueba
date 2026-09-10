/**
 * Verificador de enlaces y anclas.
 *
 * Recorre el sitio desde "/" siguiendo los enlaces internos y revisa:
 *   - que cada pagina interna responda 200
 *   - que cada ancla (#seccion) exista de verdad en la pagina destino
 *   - que no queden href="#" muertos, que saltan al tope en vez de navegar
 *
 * El tercer chequeo es el motivo de existir de este script: un verificador
 * de enlaces generico revisa codigos HTTP y no mira anclas, y los dos bugs
 * que tuvimos en este proyecto fueron justamente de ese tipo (los botones
 * de compra con href="#" y anclas que no coincidian con ningun id).
 *
 * Los enlaces externos se avisan pero no rompen el build: dependen de
 * servicios de terceros que pueden estar caidos o limitando peticiones, y
 * eso no es culpa de un cambio nuestro.
 *
 * Uso:  node scripts/check-links.mjs [baseUrl]
 */

const BASE = (process.argv[2] ?? process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const CHECK_EXTERNAL = process.env.CHECK_EXTERNAL === "1";

const visited = new Set();
const queue = ["/"];
/** @type {{kind: string, page: string, href: string, detail: string}[]} */
const errors = [];
const warnings = [];
const externals = new Map(); // href -> paginas donde aparece

const pageCache = new Map();

async function getPage(path) {
  if (pageCache.has(path)) return pageCache.get(path);
  const res = await fetch(BASE + path, { redirect: "follow" });
  const entry = { status: res.status, html: res.ok ? await res.text() : "" };
  pageCache.set(path, entry);
  return entry;
}

/** ids presentes en un html, para validar anclas */
function idsOf(html) {
  const ids = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
  return ids;
}

function hrefsOf(html) {
  return [...html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)].map((m) => m[1]);
}

async function checkPage(path) {
  const { status, html } = await getPage(path);
  if (status !== 200) {
    errors.push({ kind: "pagina", page: path, href: path, detail: `HTTP ${status}` });
    return;
  }

  const ids = idsOf(html);

  for (const raw of hrefsOf(html)) {
    const href = raw.trim();

    if (href === "" || href === "#") {
      errors.push({
        kind: "ancla vacia",
        page: path,
        href: raw || '(vacio)',
        detail: 'href="#" salta al tope de la pagina en vez de navegar',
      });
      continue;
    }
    if (/^(mailto:|tel:|javascript:|data:)/i.test(href)) continue;

    // Ancla dentro de la misma pagina
    if (href.startsWith("#")) {
      const id = decodeURIComponent(href.slice(1));
      if (!ids.has(id)) {
        errors.push({ kind: "ancla rota", page: path, href, detail: `no existe id="${id}" en esta pagina` });
      }
      continue;
    }

    // Externo
    if (/^https?:\/\//i.test(href)) {
      if (!href.startsWith(BASE)) {
        if (!externals.has(href)) externals.set(href, new Set());
        externals.get(href).add(path);
        continue;
      }
    }

    // Interno: normalizar a path + hash
    let target;
    try {
      target = new URL(href, BASE + path);
    } catch {
      errors.push({ kind: "url invalida", page: path, href, detail: "no se pudo interpretar" });
      continue;
    }
    const targetPath = target.pathname;
    const hash = target.hash ? decodeURIComponent(target.hash.slice(1)) : null;

    const { status: tStatus, html: tHtml } = await getPage(targetPath);
    if (tStatus !== 200) {
      errors.push({ kind: "enlace roto", page: path, href, detail: `${targetPath} devuelve HTTP ${tStatus}` });
      continue;
    }
    if (hash && !idsOf(tHtml).has(hash)) {
      errors.push({ kind: "ancla rota", page: path, href, detail: `no existe id="${hash}" en ${targetPath}` });
    }

    if (!visited.has(targetPath) && !queue.includes(targetPath)) queue.push(targetPath);
  }
}

async function checkExternals() {
  for (const [href, pages] of externals) {
    try {
      const res = await fetch(href, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(12000) });
      if (res.status >= 400) {
        warnings.push({ kind: "externo", page: [...pages][0], href, detail: `HTTP ${res.status}` });
      }
    } catch (err) {
      warnings.push({ kind: "externo", page: [...pages][0], href, detail: String(err.message ?? err) });
    }
  }
}

const line = (e) => `  ${e.kind.padEnd(13)} ${e.page.padEnd(18)} ${e.href}\n${" ".repeat(36)}${e.detail}`;

console.log(`Revisando enlaces en ${BASE}\n`);

while (queue.length) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);
  await checkPage(path);
}

if (CHECK_EXTERNAL) await checkExternals();

console.log(`Paginas recorridas: ${visited.size}`);
[...visited].sort().forEach((p) => console.log(`  ${p}`));
console.log(`\nEnlaces externos encontrados: ${externals.size}${CHECK_EXTERNAL ? "" : " (no verificados; CHECK_EXTERNAL=1 para hacerlo)"}`);

if (warnings.length) {
  console.log(`\nAvisos (${warnings.length}) — no rompen el build:`);
  warnings.forEach((w) => console.log(line(w)));
}

if (errors.length) {
  console.error(`\nErrores (${errors.length}):`);
  errors.forEach((e) => console.error(line(e)));
  process.exit(1);
}

console.log("\nSin enlaces ni anclas rotas.");
