const revisiones = [
  {
    titulo: 'Compatibilidad',
    texto:
      'Revisa socket, formato de placa, tipo de RAM y espacio físico, y avisa cuando una combinación no encaja.',
  },
  {
    titulo: 'Cuellos de botella',
    texto:
      'Detecta cuándo el procesador y la tarjeta gráfica no están equilibrados antes de que compres.',
  },
  {
    titulo: 'Consumo energético',
    texto: 'Suma los Watts de tu configuración y comprueba que la fuente tenga margen.',
  },
  {
    titulo: 'Vista en 3D',
    texto:
      'Cada pieza es un modelo propio que se coloca en tu equipo, para que veas el resultado.',
  },
]

// Composición tipo ficha técnica: título fijo a la izquierda, filas a la derecha.
export default function Features() {
  return (
    <section id="caracteristicas" className="section section-alt">
      <div className="bmp-wrap spec">
        <div className="spec-intro">
          <h2 className="section-title">Qué revisa Build My PC en tu configuración</h2>
          <p>
            No es solo un catálogo: un motor de reglas evalúa tu build completo y te dice qué
            corregir.
          </p>
        </div>

        <ul className="spec-list">
          {revisiones.map((r) => (
            <li key={r.titulo}>
              <h3>{r.titulo}</h3>
              <p>{r.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
