import { useState } from 'react'
import PcWireframe from '../shared/pc-wireframe'
import { cssVars } from '../shared/css-vars'

// Datos de ejemplo. En el proyecto real vendrán de la API de Python.
interface Opcion {
  id: string
  nombre: string
  detalle?: string
}
interface Cpu extends Opcion {
  socket: string
  w: number
}
interface Gpu extends Opcion {
  w: number
  alta: boolean
}
interface Fuente extends Opcion {
  w: number
}
type Tono = 'ok' | 'warn' | 'danger'

const PLACA = { socket: 'AM5', texto: 'Placa B650 con socket AM5' }
const CONSUMO_BASE = 80 // placa, RAM, almacenamiento y ventiladores (W)

const CPUS: Cpu[] = [
  { id: 'amd', nombre: 'Ryzen 7 7700X', detalle: 'AM5', socket: 'AM5', w: 105 },
  { id: 'intel', nombre: 'Core i5-13600K', detalle: 'LGA1700', socket: 'LGA1700', w: 125 },
]
const GPUS: Gpu[] = [
  { id: 'media', nombre: 'RTX 4060', detalle: '115 W', w: 115, alta: false },
  { id: 'alta', nombre: 'RTX 4080', detalle: '320 W', w: 320, alta: true },
]
const FUENTES: Fuente[] = [
  { id: '550', nombre: '550 W', w: 550 },
  { id: '750', nombre: '750 W', w: 750 },
]

interface GrupoProps {
  etiqueta: string
  opciones: Opcion[]
  valor: string
  onChange: (id: string) => void
}

function Grupo({ etiqueta, opciones, valor, onChange }: GrupoProps) {
  return (
    <div className="ctrl">
      <span className="ctrl-label">{etiqueta}</span>
      <div className="seg" role="radiogroup" aria-label={etiqueta}>
        {opciones.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={o.id === valor}
            onClick={() => onChange(o.id)}
          >
            {o.nombre}
            {o.detalle && <small>{o.detalle}</small>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Bench() {
  const [cpuId, setCpuId] = useState('amd')
  const [gpuId, setGpuId] = useState('media')
  const [psuId, setPsuId] = useState('550')

  const cpu = CPUS.find((c) => c.id === cpuId) ?? CPUS[0]
  const gpu = GPUS.find((g) => g.id === gpuId) ?? GPUS[0]
  const psu = FUENTES.find((f) => f.id === psuId) ?? FUENTES[0]

  // Reglas de ejemplo (la lógica real vivirá en el backend)
  const total = cpu.w + gpu.w + CONSUMO_BASE
  const minimo = Math.ceil((total * 1.2) / 50) * 50
  const socketOk = cpu.socket === PLACA.socket
  const fuenteJusta = socketOk && psu.w < total * 1.2
  const uso = Math.min(100, Math.round((total / psu.w) * 100))

  let estado: { tono: Tono; titulo: string; texto: string }
  if (!socketOk) {
    estado = {
      tono: 'danger',
      titulo: 'Procesador incompatible',
      texto: `El ${cpu.nombre} usa socket ${cpu.socket} y la placa es ${PLACA.socket}.`,
    }
  } else if (fuenteJusta) {
    estado = {
      tono: 'warn',
      titulo: 'La fuente queda justa',
      texto: `El consumo estimado es de ${total} W. Elige una fuente de al menos ${minimo} W.`,
    }
  } else {
    estado = {
      tono: 'ok',
      titulo: 'Configuración compatible',
      texto: `El consumo estimado es de ${total} W y la fuente tiene margen.`,
    }
  }

  return (
    <aside className="bench" id="simulador" aria-label="Simulador de ejemplo">
      <div className="bench-head">
        <strong>Prueba el simulador</strong>
        <span>Datos de ejemplo</span>
      </div>

      <div className="bench-stage">
        <PcWireframe
          socketOk={socketOk}
          fuenteJusta={fuenteJusta}
          gpuAlta={gpu.alta}
          cpuId={cpu.id}
          gpuId={gpu.id}
          psuId={psu.id}
        />
      </div>

      <div className="bench-controls">
        <div className="ctrl">
          <span className="ctrl-label">Placa</span>
          <span className="ctrl-static">{PLACA.texto}</span>
        </div>
        <Grupo etiqueta="Procesador" opciones={CPUS} valor={cpuId} onChange={setCpuId} />
        <Grupo etiqueta="Tarjeta gráfica" opciones={GPUS} valor={gpuId} onChange={setGpuId} />
        <Grupo etiqueta="Fuente" opciones={FUENTES} valor={psuId} onChange={setPsuId} />
      </div>

      <div className="readout" data-estado={estado.tono}>
        <div className="readout-top">
          <span>Consumo estimado</span>
          <strong>
            {total} W de {psu.w} W
          </strong>
        </div>
        <div className="meter">
          <i style={cssVars({ '--w': `${uso}%` })} />
        </div>
        <p className="readout-msg" aria-live="polite">
          <strong>{estado.titulo}.</strong> {estado.texto}
        </p>
      </div>
    </aside>
  )
}
