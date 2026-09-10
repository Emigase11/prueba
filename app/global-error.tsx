"use client";

import { useEffect } from "react";

/**
 * Ultimo recurso: solo se monta si el que falla es el layout raiz. Como
 * reemplaza al layout entero, tiene que traer su propio <html> y <body>.
 *
 * Por eso va con estilos en linea y sin importar nada del proyecto: si lo que
 * fallo fue el layout, no hay garantia de que las hojas de estilo, las fuentes
 * ni los componentes esten disponibles. Una pagina de emergencia que depende de
 * lo que se rompio no sirve de nada.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error en el layout raiz", error.digest ?? "", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1d23",
          color: "#fff",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#ff9a66",
            }}
          >
            Cmax System
          </p>
          <h1
            style={{
              margin: "0.75rem 0 0",
              fontSize: "2.25rem",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              margin: "1rem 0 0",
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            An unexpected error stopped the site from loading. Trying again
            usually solves it. If it keeps happening, write to us at{" "}
            <a href="mailto:info@cmaxsystem.com" style={{ color: "#ff9a66" }}>
              info@cmaxsystem.com
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1.75rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#fff",
              background: "#b8430f",
              border: 0,
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
