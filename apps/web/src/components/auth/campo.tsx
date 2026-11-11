import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'

// Campo de formulario reutilizable: etiqueta, input, ayuda y error.
// Si el tipo es "password" agrega el botón para mostrar u ocultar la contraseña.
interface CampoProps {
  id: string
  etiqueta: string
  tipo?: 'text' | 'email' | 'password'
  valor: string
  onChange: (valor: string) => void
  error?: string
  ayuda?: string
  autoComplete?: string
  children?: ReactNode
}

export default function Campo({
  id,
  etiqueta,
  tipo = 'text',
  valor,
  onChange,
  error,
  ayuda,
  autoComplete,
  children,
}: CampoProps) {
  const [visible, setVisible] = useState(false)
  const esClave = tipo === 'password'
  const descripcion = error ? `${id}-error` : ayuda ? `${id}-ayuda` : undefined

  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      <div className="input-wrap">
        <input
          id={id}
          name={id}
          type={esClave && visible ? 'text' : tipo}
          value={valor}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={descripcion}
          className={`input ${esClave ? 'input-clave' : ''} ${error ? 'input-error' : ''}`}
        />
        {esClave && (
          <button
            type="button"
            className="input-toggle"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {visible ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>

      {error ? (
        <p className="campo-error" id={`${id}-error`}>
          {error}
        </p>
      ) : ayuda ? (
        <p className="campo-ayuda" id={`${id}-ayuda`}>
          {ayuda}
        </p>
      ) : null}

      {children}
    </div>
  )
}
