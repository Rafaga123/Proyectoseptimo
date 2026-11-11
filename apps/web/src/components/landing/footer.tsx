import Logo from '../shared/logo'

// Se calcula una sola vez, fuera del componente, para mantener el render puro.
const ANIO = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="bmp-wrap footer-inner">
        <Logo size={24} />
        <p>© {ANIO} Build My PC · Proyecto universitario</p>
      </div>
    </footer>
  )
}
