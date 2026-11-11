import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

// Esquema de una PC en estilo plano técnico.
// Reacciona al simulador de ejemplo: marca en rojo un procesador incompatible,
// en ámbar una fuente justa y agranda la gráfica si es de gama alta.
// Más adelante este mismo espacio puede sustituirse por el visor 3D real.
interface PcWireframeProps {
  socketOk?: boolean
  fuenteJusta?: boolean
  gpuAlta?: boolean
  cpuId?: string
  gpuId?: string
  psuId?: string
}

export default function PcWireframe({
  socketOk = true,
  fuenteJusta = false,
  gpuAlta = false,
  cpuId,
  gpuId,
  psuId,
}: PcWireframeProps) {
  // Los retrasos de la animación de "ensamblado" solo aplican al cargar la página.
  const [listo, setListo] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setListo(true), 1500)
    return () => clearTimeout(t)
  }, [])
  const delay = (ms: number): CSSProperties => ({ animationDelay: listo ? '0ms' : `${ms}ms` })

  const alturaGpu = gpuAlta ? 78 : 55
  const centroGpu = 255 + alturaGpu / 2
  const ventiladores = gpuAlta ? [128, 188, 248] : [140, 235]

  return (
    <svg
      className="pc-wireframe"
      viewBox="0 0 420 460"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      role="img"
      aria-label="Esquema de una PC con procesador, memoria, tarjeta gráfica y fuente de poder"
    >
      {/* Gabinete */}
      <g className="part" style={delay(0)}>
        <rect x="40" y="20" width="340" height="420" rx="10" className="wf-case" />
        <line x1="40" y1="60" x2="380" y2="60" className="wf-dim" />
      </g>

      {/* Tarjeta madre */}
      <g className="part" style={delay(150)}>
        <rect x="70" y="85" width="230" height="260" rx="4" className="wf-board" />
        <rect x="90" y="235" width="190" height="9" rx="2" className="wf-dim" />
      </g>

      {/* Procesador */}
      <g key={`cpu-${cpuId}`} className="part" style={delay(300)}>
        <rect
          x="110"
          y="115"
          width="70"
          height="70"
          rx="3"
          className={socketOk ? 'wf-accent' : 'wf-bad'}
        />
        <rect x="125" y="130" width="40" height="40" rx="2" className="wf-dim" />
        <text x="145" y="155" textAnchor="middle" className="wf-label">
          CPU
        </text>
      </g>

      {/* Memoria RAM */}
      <g className="part" style={delay(450)}>
        {[215, 232, 249, 266].map((x) => (
          <rect key={x} x={x} y="110" width="9" height="90" rx="1.5" className="wf-ram" />
        ))}
        <text x="240" y="217" textAnchor="middle" className="wf-label">
          RAM
        </text>
      </g>

      {/* Tarjeta gráfica */}
      <g key={`gpu-${gpuId}`} className="part" style={delay(600)}>
        <rect x="85" y="255" width="205" height={alturaGpu} rx="5" className="wf-accent" />
        {ventiladores.map((x) => (
          <circle key={x} cx={x} cy={centroGpu} r="17" className="wf-dim" />
        ))}
        <text
          x="188"
          y={gpuAlta ? 255 + alturaGpu - 8 : centroGpu + 4}
          textAnchor="middle"
          className="wf-label"
        >
          GPU
        </text>
      </g>

      {/* Fuente de poder */}
      <g key={`psu-${psuId}`} className="part" style={delay(750)}>
        <rect
          x="70"
          y="365"
          width="150"
          height="55"
          rx="4"
          className={fuenteJusta ? 'wf-warn' : 'wf-board'}
        />
        <circle cx="145" cy="392" r="18" className="wf-dim" />
        <text x="145" y="397" textAnchor="middle" className="wf-label">
          PSU
        </text>
      </g>

      {/* Almacenamiento */}
      <g className="part" style={delay(900)}>
        <rect x="320" y="110" width="40" height="80" rx="3" className="wf-board" />
        <rect x="320" y="205" width="40" height="80" rx="3" className="wf-board" />
        <text x="340" y="153" textAnchor="middle" className="wf-label">
          SSD
        </text>
      </g>

      {/* Cota decorativa */}
      <g className="part" style={delay(1000)}>
        <line x1="40" y1="455" x2="380" y2="455" className="wf-dim" />
        <line x1="40" y1="449" x2="40" y2="461" className="wf-dim" />
        <line x1="380" y1="449" x2="380" y2="461" className="wf-dim" />
      </g>
    </svg>
  )
}
