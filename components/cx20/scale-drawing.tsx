import { cx20 } from "@/lib/content/cx20";

/**
 * Las dos medidas del CX20 dibujadas a escala real: la barra de "37 in" mide,
 * sobre la de "14 ft", exactamente lo que 37 pulgadas miden sobre 14 pies. El
 * largo sale de la division, no de un numero elegido a ojo, asi que si manana
 * cambian las medidas el dibujo se corrige solo.
 *
 * El hero decia en prosa lo que el producto hace y no mostraba nada. Esto lo
 * muestra: el salto entre las dos barras ES el producto.
 *
 * No hay linea de datum comun entre las dos barras a proposito. El contenido
 * dice "folds to 37 inches" y "opens into a 14-foot living space" pero no dice
 * que sean el mismo eje, y una cota compartida lo afirmaria.
 *
 * Los numeros van en tabular-nums para que las cifras se alineen en columna.
 */
export function ScaleDrawing({ className }: { className?: string }) {
  const { scale } = cx20.hero;
  const longest = Math.max(...scale.map((s) => s.inches));

  return (
    <ul className={className}>
      {scale.map((step, i) => (
        <li key={step.value} className="grid gap-2">
          {/* La barra: regla con marcas en las dos puntas, como una cota de
              plano. Se dibuja sola al cargar, escalando en X desde la
              izquierda: es la unica animacion del hero y hace lo que dice el
              titular. Solo transform, asi corre fuera del hilo principal. */}
          <div
            className="dim-rule relative h-2 text-brand-light"
            style={{
              width: `${(step.inches / longest) * 100}%`,
              animationDelay: `${240 + i * 140}ms`,
            }}
            aria-hidden
          >
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
            <span className="absolute left-0 top-0 h-2 w-px bg-current" />
            <span className="absolute right-0 top-0 h-2 w-px bg-current" />
          </div>

          <p className="flex flex-wrap items-baseline gap-x-2 text-body-sm">
            <span className="font-semibold tabular-nums text-white">
              {step.value}
            </span>
            <span className="text-background/60">{step.label}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
