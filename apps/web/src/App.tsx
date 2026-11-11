import { Routes, Route, Navigate } from 'react-router-dom'
import Builder from './pages/builder'
import Landing from './pages/landing'
import Auth from './pages/auth'
import Pendiente from './pages/pendiente'
import './App.css'

// Mapa de rutas de la aplicación.
// Las rutas fijas ("/", "/onboarding", "/workspace") tienen prioridad sobre "/:modo".
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Login y registro comparten la misma pantalla ("/login" y "/registro")
          para que el panel azul se deslice sin recargar la página. */}
      <Route path="/:modo" element={<Auth />} />

      {/* Pantalla que se construirá en el siguiente paso */}
      <Route
        path="/onboarding"
        element={
          <Pendiente
            titulo="Cuéntanos cómo usarás tu PC"
            texto="Aquí irá el formulario de perfil de uso: Gamer, Diseño y renderizado o Productividad. Es el siguiente paso del registro."
          />
        }
      />

      {/* El simulador 3D del equipo (antes se mostraba en "/") */}
      <Route path="/workspace" element={<Builder />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
