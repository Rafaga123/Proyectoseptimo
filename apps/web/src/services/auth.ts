// SIMULADO: todavía no hay backend conectado.
// Cuando la API de Python (FastAPI) esté lista, reemplaza el cuerpo de estas
// funciones por un fetch real. Endpoints sugeridos:
//   POST /api/auth/login     { email, password }
//   POST /api/auth/register  { username, email, password }
// Si el servidor responde con error, lanza una excepción: los formularios
// ya muestran un mensaje cuando eso ocurre.

export interface Credenciales {
  email: string
  password: string
}

export interface DatosRegistro extends Credenciales {
  username: string
}

export interface Sesion {
  ok: true
  usuario: { email: string; username?: string }
}

const esperar = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export async function iniciarSesion(datos: Credenciales): Promise<Sesion> {
  await esperar(700)
  return { ok: true, usuario: { email: datos.email } }
}

export async function registrarUsuario(datos: DatosRegistro): Promise<Sesion> {
  await esperar(700)
  return { ok: true, usuario: { email: datos.email, username: datos.username } }
}
