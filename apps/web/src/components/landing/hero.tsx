import { Link } from 'react-router-dom'
import Bench from './bench'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="bmp-wrap hero-grid">
        <div className="hero-copy">
          <h1>Arma y visualiza tu PC ideal según tus necesidades</h1>
          <p className="hero-lead">
            Elige las piezas, mira cómo encajan en 3D y recibe una revisión técnica de tu
            configuración.
          </p>
          <div className="hero-cta">
            <Link to="/registro" className="btn btn-primary btn-lg">
              Crear cuenta
            </Link>
            <a href="#como-funciona" className="btn btn-ghost btn-lg">
              Ver cómo funciona
            </a>
          </div>
          <p className="hero-hint">
            Cambia una pieza en el simulador y mira cómo reacciona la configuración.
          </p>
        </div>

        <Bench />
      </div>
    </section>
  )
}
