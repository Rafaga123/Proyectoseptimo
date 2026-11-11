import { Link } from 'react-router-dom'
import Logo from '../components/shared/logo'

// Pantalla provisional para las rutas que aún no están construidas.
interface PendienteProps {
  titulo: string
  texto: string
}

export default function Pendiente({ titulo, texto }: PendienteProps) {
  return (
    <div className="bmp">
      <main className="bmp-wrap pendiente">
        <Logo />
        <h1>{titulo}</h1>
        <p>{texto}</p>
        <Link to="/" className="btn btn-ghost">
          Volver al inicio
        </Link>
      </main>
    </div>
  )
}
