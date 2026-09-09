/**
 * Punto de entrada del contenido.
 *
 * `content` = compartido + Air X2, con la MISMA forma que tenia cuando todo
 * vivia en un solo archivo: las secciones del Air X2 siguen importando
 * `content` de aca sin cambios. Las secciones del CX20 importan `cx20` de
 * ./content/cx20 y `shared` de ./content/shared.
 */

export * from "./content/shared";
export * from "./content/air-x2";

import { shared } from "./content/shared";
import { airX2 } from "./content/air-x2";

export const content = { ...shared, ...airX2 };
export type SiteContent = typeof content;
