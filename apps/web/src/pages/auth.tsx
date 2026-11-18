import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Logo from '../components/shared/logo'
import PcWireframe from '../components/shared/pc-wireframe'
import LoginForm from '../components/auth/login-form'
import RegisterForm from '../components/auth/register-form'

// Lee el tema guardado (mismo que usa la navbar de la landing)
function temaGuardado(): 'dark' | 'light' {
  try {
    const v = localStorage.getItem('bmp-theme')
    if (v === 'dark' || v === 'light') return v
  } catch {
    // silencioso
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function Auth() {
  const { modo } = useParams()
  const esLogin = modo === 'login'
  const esRegistro = modo === 'registro'

  // Aplica el tema guardado al montar la página
  useEffect(() => {
    const bmp = document.querySelector('.bmp')
    const target = bmp ?? document.documentElement
    target.setAttribute('data-theme', temaGuardado())
  }, [])

  // Al cambiar de modo en pantallas grandes, el foco pasa al primer campo.
  useEffect(() => {
    if (!window.matchMedia('(min-width: 861px)').matches) return
    const id = esLogin ? 'login-email' : esRegistro ? 'reg-username' : null
    if (id) document.getElementById(id)?.focus({ preventScroll: true })
  }, [esLogin, esRegistro])

  if (!esLogin && !esRegistro) return <Navigate to="/" replace />

  return (
    <div className="bmp auth-page">
      <header className="bmp-wrap auth-top">
        <Link to="/" aria-label="Build My PC, volver al inicio">
          <Logo />
        </Link>
        <Link to="/" className="auth-back">
          Volver al inicio
        </Link>
      </header>

      <main className="bmp-wrap auth-main">
        <div className="auth-card" data-modo={modo}>
          {/* Selector para pantallas pequeñas */}
          <nav className="auth-switch" aria-label="Iniciar sesión o crear cuenta">
            <Link to="/login" aria-current={esLogin ? 'page' : undefined}>
              Iniciar sesión
            </Link>
            <Link to="/registro" aria-current={esRegistro ? 'page' : undefined}>
              Crear cuenta
            </Link>
          </nav>

          <section className={`auth-pane auth-pane-login ${esLogin ? 'activo' : ''}`}>
            <LoginForm />
          </section>

          <section className={`auth-pane auth-pane-registro ${esRegistro ? 'activo' : ''}`}>
            <RegisterForm />
          </section>

          {/* Panel deslizante */}
          <aside className="auth-overlay">
            <div className="overlay-art" aria-hidden="true">
              <PcWireframe />
            </div>

            <div className={`overlay-copy ${esLogin ? 'activo' : ''}`}>
              <h2>¿Primera vez en Build My PC?</h2>
              <p>Crea tu cuenta con tres datos básicos. Después definimos tu perfil de uso.</p>
              <Link to="/registro" className="btn btn-dark btn-lg">
                Crear cuenta
              </Link>
            </div>

            <div className={`overlay-copy ${esRegistro ? 'activo' : ''}`}>
              <h2>¿Ya tienes cuenta?</h2>
              <p>Entra para retomar tus builds y seguir donde lo dejaste.</p>
              <Link to="/login" className="btn btn-dark btn-lg">
                Iniciar sesión
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
