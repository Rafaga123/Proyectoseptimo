import type { CSSProperties } from 'react'

// Estas utilidades son de los componentes de Build My PC (landing y auth).

/** Pasa una variable CSS propia (por ejemplo --w) a la propiedad style. */
export function cssVars(vars: Record<`--${string}`, string>): CSSProperties {
  return vars as CSSProperties
}
