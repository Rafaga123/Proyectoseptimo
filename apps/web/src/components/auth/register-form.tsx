import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Campo from './campo'
import { cssVars } from '../shared/css-vars'
import { registrarUsuario } from '../../services/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USUARIO_RE = /^[A-Za-z0-9_]{3,20}$/

interface Errores {
  username?: string
  email?: string
  password?: string
}

interface Nivel {
  texto: string
  tono: 'ok' | 'warn' | 'danger'
  porcentaje: number
}

const NIVELES: Nivel[] = [
  { texto: 'Muy corta', tono: 'danger', porcentaje: 25 },
  { texto: 'Aceptable', tono: 'warn', porcentaje: 55 },
  { texto: 'Buena', tono: 'ok', porcentaje: 80 },
  { texto: 'Fuerte', tono: 'ok', porcentaje: 100 },
]

// Mide la contraseña de forma sencilla: largo y variedad de caracteres.
function medirClave(clave: string): Nivel | null {
  if (!clave) return null
  // Si no llega a 8 caracteres siempre es "Muy corta"
  if (clave.length < 8) return NIVELES[0]

  let puntos = 0
  if (clave.length >= 8) puntos += 1
  if (clave.length >= 12) puntos += 1
  if (/[A-Z]/.test(clave) && /[a-z]/.test(clave) && /\d/.test(clave)) puntos += 1
  return NIVELES[puntos]
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState<Errores>({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

  const fuerza = medirClave(password)

  function validar(): Errores {
    const e: Errores = {}
    if (!username.trim()) e.username = 'Elige un nombre de usuario.'
    else if (!USUARIO_RE.test(username.trim()))
      e.username = 'Usa de 3 a 20 letras, números o guion bajo.'

    if (!email.trim()) e.email = 'Escribe tu correo electrónico.'
    else if (!EMAIL_RE.test(email.trim())) e.email = 'Revisa el formato: nombre@dominio.com.'

    if (!password) e.password = 'Crea una contraseña.'
    else if (password.length < 8) e.password = 'Usa al menos 8 caracteres.'
    return e
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErrorGeneral('')
    const e = validar()
    setErrores(e)
    if (Object.keys(e).length > 0) return

    setEnviando(true)
    try {
      await registrarUsuario({ username: username.trim(), email: email.trim(), password })
      // Tras crear la cuenta, el usuario pasa al formulario de perfil de uso.
      navigate('/onboarding')
    } catch {
      setErrorGeneral('No pudimos crear tu cuenta. Inténtalo de nuevo en unos minutos.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={enviar} noValidate>
      <ol className="pasos" aria-label="Progreso del registro">
        <li className="paso paso-activo" aria-current="step">
          <span>1</span>Cuenta
        </li>
        <li className="paso">
          <span>2</span>Perfil de uso
        </li>
      </ol>

      <h1 className="auth-title">Crea tu cuenta</h1>
      <p className="auth-sub">Solo necesitamos tres datos. Después definimos tu perfil de uso.</p>

      {errorGeneral && (
        <p className="auth-alert" role="alert">
          {errorGeneral}
        </p>
      )}

      <Campo
        id="reg-username"
        etiqueta="Nombre de usuario"
        valor={username}
        onChange={setUsername}
        error={errores.username}
        autoComplete="username"
      />
      <Campo
        id="reg-email"
        etiqueta="Correo electrónico"
        tipo="email"
        valor={email}
        onChange={setEmail}
        error={errores.email}
        autoComplete="email"
      />
      <Campo
        id="reg-password"
        etiqueta="Contraseña"
        tipo="password"
        valor={password}
        onChange={setPassword}
        error={errores.password}
        ayuda="Mínimo 8 caracteres."
        autoComplete="new-password"
      >
        {fuerza && (
          <div className="fuerza">
            <div className="meter">
              <i
                style={cssVars({
                  '--w': `${fuerza.porcentaje}%`,
                  '--tone': `var(--${fuerza.tono})`,
                })}
              />
            </div>
            <span className="fuerza-texto">{fuerza.texto}</span>
          </div>
        )}
      </Campo>

      <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={enviando}>
        {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  )
}
