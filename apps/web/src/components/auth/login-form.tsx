import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Campo from './campo'
import { iniciarSesion } from '../../services/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Errores {
  email?: string
  password?: string
}

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState<Errores>({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [enviando, setEnviando] = useState(false)

  function validar(): Errores {
    const e: Errores = {}
    if (!email.trim()) e.email = 'Escribe tu correo electrónico.'
    else if (!EMAIL_RE.test(email.trim())) e.email = 'Revisa el formato: nombre@dominio.com.'
    if (!password) e.password = 'Escribe tu contraseña.'
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
      await iniciarSesion({ email: email.trim(), password })
      navigate('/workspace')
    } catch {
      setErrorGeneral(
        'No pudimos iniciar sesión. Revisa tu correo y contraseña e inténtalo de nuevo.',
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={enviar} noValidate>
      <h1 className="auth-title">Inicia sesión</h1>
      <p className="auth-sub">Entra para retomar tus builds guardadas.</p>

      {errorGeneral && (
        <p className="auth-alert" role="alert">
          {errorGeneral}
        </p>
      )}

      <Campo
        id="login-email"
        etiqueta="Correo electrónico"
        tipo="email"
        valor={email}
        onChange={setEmail}
        error={errores.email}
        autoComplete="email"
      />
      <Campo
        id="login-password"
        etiqueta="Contraseña"
        tipo="password"
        valor={password}
        onChange={setPassword}
        error={errores.password}
        autoComplete="current-password"
      />

      <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={enviando}>
        {enviando ? 'Entrando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
