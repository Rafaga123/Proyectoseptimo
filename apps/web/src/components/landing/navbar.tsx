import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../shared/logo'
import Icon from '../shared/icon'

const links = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#caracteristicas', label: 'Qué revisa' },
  { href: '#perfiles', label: 'Perfiles' },
]

export default function Navbar() {
  // Estado para abrir/cerrar el menú en pantallas pequeñas
  const [abierto, setAbierto] = useState(false)
  const cerrar = () => setAbierto(false)

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
          {/* Estos dos solo se ven dentro del menú móvil */}
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
