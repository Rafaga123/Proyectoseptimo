import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../shared/logo'
import Icon from '../shared/icon'

const links = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#caracteristicas', label: 'Qué revisa' },
  { href: '#perfiles', label: 'Perfiles' },
]

// Lee el tema guardado o detecta la preferencia del sistema
function temaInicial(): 'dark' | 'light' {
  try {
    const guardado = localStorage.getItem('bmp-theme')
    if (guardado === 'dark' || guardado === 'light') return guardado
  } catch {
    // localStorage puede no estar disponible
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [tema, setTema] = useState<'dark' | 'light'>(temaInicial)
  const cerrar = () => setAbierto(false)

  // Aplica el tema al elemento .bmp más cercano (o al html si no hay uno)
  useEffect(() => {
    // Busca el .bmp raíz (la landing usa uno en la página)
    const bmp = document.querySelector('.bmp')
    const target = bmp ?? document.documentElement
    target.setAttribute('data-theme', tema)
    try {
      localStorage.setItem('bmp-theme', tema)
    } catch {
      // silencioso
    }
  }, [tema])

  const alternarTema = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <header className="navbar">
      <div className="bmp-wrap navbar-inner">
        <a href="#inicio" className="navbar-logo" onClick={cerrar}>
          <Logo />
        </a>

        <nav className={`navbar-links ${abierto ? 'open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={cerrar}>
              {l.label}
            </a>
          ))}
          {/* Acciones solo visibles dentro del menú móvil */}
          <div className="navbar-mobile-actions">
            <Link to="/login" className="btn btn-ghost">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="btn btn-primary">
              Crear cuenta
            </Link>
          </div>
        </nav>

        <div className="navbar-actions">
          {/* Toggle de tema */}
          <button
            className="theme-toggle"
            onClick={alternarTema}
            aria-label={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {tema === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link to="/login" className="btn btn-ghost">
            Iniciar sesión
          </Link>
          <Link to="/registro" className="btn btn-primary">
            Crear cuenta
          </Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setAbierto(!abierto)}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
        >
          <Icon name={abierto ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

// Iconos inline para no depender de una librería
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
