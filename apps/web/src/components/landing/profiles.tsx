import { useState } from 'react'
import { cssVars } from '../shared/css-vars'

// Valores ilustrativos de cómo se verá el reporte según el perfil.
interface Metrica {
  n: string
  v: string
  p: number
}
interface Perfil {
  id: string
  nombre: string
  titulo: string
  texto: string
  metricas: Metrica[]
}

const PERFILES: Perfil[] = [
  {
    id: 'gamer',
    nombre: 'Gamer',
    titulo: 'Para jugar a la resolución que quieres',
    texto:
      'Elige 1080p, 1440p o 4K y comprueba si tu combinación de procesador y gráfica lo sostiene.',
    metricas: [
      { n: 'Resolución objetivo', v: '1440p', p: 75 },
      { n: 'FPS estimados', v: '110 FPS', p: 70 },
      { n: 'Equilibrio entre CPU y GPU', v: 'Bueno', p: 88 },
    ],
  },
  {
    id: 'diseno',
    nombre: 'Diseño y renderizado',
    titulo: 'Para trabajar con software creativo',
    texto:
      'Mide tiempos de exportación y memoria de video, y comprueba que tu software funcione bien con las piezas elegidas.',
    metricas: [
      { n: 'Tiempo de exportación', v: 'Medio', p: 60 },
      { n: 'Uso de VRAM', v: '8 de 12 GB', p: 66 },
      { n: 'Compatibilidad con software', v: 'Blender, Premiere, AutoCAD', p: 100 },
    ],
  },
  {
    id: 'productividad',
    nombre: 'Productividad',
    titulo: 'Para el día a día sin pagar de más',
    texto: 'Prioriza la multitarea y la ofimática dentro de un presupuesto ajustado.',
    metricas: [
      { n: 'Multitarea', v: 'Fluida', p: 82 },
      { n: 'Ofimática', v: 'Cómoda', p: 92 },
      { n: 'Uso del presupuesto', v: 'Ajustado', p: 68 },
    ],
  },
]

export default function Profiles() {
  const [activo, setActivo] = useState('gamer')
  const perfil = PERFILES.find((p) => p.id === activo) ?? PERFILES[0]

  return (
    <section id="perfiles" className="section">
      <div className="bmp-wrap">
        <h2 className="section-title">El reporte cambia según para qué usas tu PC</h2>

        <div className="tabs" role="tablist" aria-label="Perfiles de uso">
          {PERFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={p.id === activo}
              aria-controls="panel-perfil"
              className="tab"
              onClick={() => setActivo(p.id)}
            >
              {p.nombre}
            </button>
          ))}
        </div>

        <div
          className="tab-panel"
          id="panel-perfil"
          role="tabpanel"
          aria-labelledby={`tab-${perfil.id}`}
        >
          <div className="panel-copy">
            <h3>{perfil.titulo}</h3>
            <p>{perfil.texto}</p>
          </div>

          <div className="report" key={perfil.id}>
            {perfil.metricas.map((m) => (
              <div key={m.n} className="metric">
                <div className="metric-top">
                  <span>{m.n}</span>
                  <span>{m.v}</span>
                </div>
                <div className="bar">
                  <i style={cssVars({ '--w': `${m.p}%` })} />
                </div>
              </div>
            ))}
            <p className="report-note">Valores de ejemplo del reporte final.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
