const fases = [
  {
    titulo: 'Define tu perfil',
    texto:
      'Al crear tu cuenta respondes un cuestionario corto: si juegas, diseñas o trabajas con tu PC.',
  },
  {
    titulo: 'Arma tu PC en 3D',
    texto:
      'Elige piezas de un catálogo filtrado por compatibilidad y míralas colocarse en el modelo.',
  },
  {
    titulo: 'Revisa el reporte',
    texto:
      'Recibe cuellos de botella, consumo en Watts y rendimiento estimado para tu tipo de uso.',
  },
]

// Las fases sí son una secuencia, por eso van numeradas y escalonadas.
export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="bmp-wrap">
        <h2 className="section-title">Tres fases, de tu perfil al reporte final</h2>

        <ol className="stairs">
          {fases.map((f, i) => (
            <li key={f.titulo} className="stair">
              <span className="stair-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{f.titulo}</h3>
              <p>{f.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
