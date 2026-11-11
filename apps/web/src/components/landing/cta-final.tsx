import { Link } from 'react-router-dom'

export default function CtaFinal() {
  return (
    <section className="cta">
      <div className="bmp-wrap cta-inner">
        <h2>Tu próxima PC empieza aquí</h2>
        <div className="cta-side">
          <p>Crea tu cuenta, define tu perfil y entra al simulador.</p>
          <Link to="/registro" className="btn btn-dark btn-lg">
            Crear cuenta
          </Link>
        </div>
      </div>
    </section>
  )
}
