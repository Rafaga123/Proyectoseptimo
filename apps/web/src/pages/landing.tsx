import Navbar from '../components/landing/navbar'
import Hero from '../components/landing/hero'
import HowItWorks from '../components/landing/how-it-works'
import Features from '../components/landing/features'
import Profiles from '../components/landing/profiles'
import CtaFinal from '../components/landing/cta-final'
import Footer from '../components/landing/footer'

// La página es solo la suma de sus secciones, en orden.
// La clase "bmp" activa los colores y tipografías de Build My PC solo aquí,
// para no afectar a las pantallas de Tailwind (por ejemplo, el simulador).
export default function Landing() {
  return (
    <div className="bmp">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Profiles />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  )
}
