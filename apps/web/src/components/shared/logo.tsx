// LOGO PROVISIONAL.
// Cuando el equipo tenga logo definitivo, solo hay que cambiarlo aquí
// y se actualiza en la navbar, el footer y las pantallas de login/registro.
interface LogoProps {
  size?: number
}

export default function Logo({ size = 28 }: LogoProps) {
  return (
    <span className="logo">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <rect x="11" y="11" width="10" height="10" rx="1.5" fill="currentColor" opacity="0.9" />
        {[10, 16, 22].map((p) => (
          <g key={p} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1={p} y1="2" x2={p} y2="6" />
            <line x1={p} y1="26" x2={p} y2="30" />
            <line x1="2" y1={p} x2="6" y2={p} />
            <line x1="26" y1={p} x2="30" y2={p} />
          </g>
        ))}
      </svg>
      <span className="logo-text">
        Build My <strong>PC</strong>
      </span>
    </span>
  )
}
