"""Tablas de la base de datos. Una clase = una tabla; un atributo = una columna.

Es la version en codigo del diagrama (borrador_v3.dbml) y usa los mismos nombres.
Las fechas no llevan zona horaria, igual que en el diagrama.
Por ahora solo hay columnas y llaves foraneas; las "relationship" (para navegar de
un objeto a otro, ej. usuario.rol) se agregan cuando los endpoints las necesiten.
"""

from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Index, Numeric, String, Text, func, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

# ---------- USUARIOS, ROLES Y PERFILES ----------


class Rol(Base):
    """usuario o administrador. Solo habra 3 administradores (los 3 devs)."""

    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(30), unique=True)
    descripcion: Mapped[str | None] = mapped_column(Text)


class Perfil(Base):
    """gamer, editor, programador, electrico."""

    __tablename__ = "perfiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), unique=True)
    descripcion: Mapped[str | None] = mapped_column(Text)


class Usuario(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    correo: Mapped[str] = mapped_column(String(255), unique=True)
    contrasena_cifrada: Mapped[str] = mapped_column(String(255))  # nunca la real
    rol_id: Mapped[int] = mapped_column(ForeignKey("roles.id"))
    perfil_id: Mapped[int] = mapped_column(ForeignKey("perfiles.id"))
    activo: Mapped[bool] = mapped_column(server_default=text("true"))
    ultimo_acceso: Mapped[datetime | None] = mapped_column(DateTime)
    creado_en: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


# ---------- METRICAS  ----------


class Metrica(Base):
    __tablename__ = "metricas"

    id: Mapped[int] = mapped_column(primary_key=True)
    codigo: Mapped[str] = mapped_column(String(50), unique=True)  # ej: consumo_electrico
    nombre: Mapped[str] = mapped_column(String(100))  # ej: Consumo electrico
    unidad: Mapped[str | None] = mapped_column(String(20))  # W, FPS, segundos...


class PerfilMetrica(Base):
    """Metricas que se activan por defecto en cada perfil."""

    __tablename__ = "perfil_metricas"

    perfil_id: Mapped[int] = mapped_column(ForeignKey("perfiles.id"), primary_key=True)
    metrica_id: Mapped[int] = mapped_column(ForeignKey("metricas.id"), primary_key=True)


class UsuarioMetrica(Base):
    """Metricas que el usuario tiene activadas (puede cambiarlas cuando quiera)."""

    __tablename__ = "usuario_metricas"

    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), primary_key=True)
    metrica_id: Mapped[int] = mapped_column(ForeignKey("metricas.id"), primary_key=True)


# ---------- DE DONDE SALEN LOS DATOS ----------


class FuenteDatos(Base):
    """Cada dato guarda de que fuente viene (y con que licencia)."""

    __tablename__ = "fuentes_datos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), unique=True)
    url: Mapped[str | None] = mapped_column(String(255))
    licencia: Mapped[str | None] = mapped_column(String(100))  # ej: CC0, ODC-By 1.0


# ---------- COMPONENTES ----------


class Categoria(Base):
    """procesador, tarjeta de video, memoria RAM..."""

    __tablename__ = "categorias"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), unique=True)


class Marca(Base):
    __tablename__ = "marcas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), unique=True)


class Componente(Base):
    """Una pieza concreta (ej: AMD Ryzen 5 7600). Sus datos propios van en atributos."""

    __tablename__ = "componentes"
    __table_args__ = (Index("ux_componentes_marca_modelo", "marca_id", "modelo", unique=True),)

    id: Mapped[int] = mapped_column(primary_key=True)
    categoria_id: Mapped[int] = mapped_column(ForeignKey("categorias.id"))
    marca_id: Mapped[int] = mapped_column(ForeignKey("marcas.id"))
    modelo: Mapped[str] = mapped_column(String(128))
    precio_usd: Mapped[Decimal | None] = mapped_column(Numeric(10, 2))
    consumo_watts: Mapped[int | None]  # TDP; vacio si no consume (ej: gabinete)
    modelo_3d: Mapped[str | None] = mapped_column(String(255))  # ruta del .glb
    fuente_id: Mapped[int | None] = mapped_column(ForeignKey("fuentes_datos.id"))
    # En vez de borrar un componente se oculta, para no romper los armados guardados.
    activo: Mapped[bool] = mapped_column(server_default=text("true"))
    creado_en: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    actualizado_en: Mapped[datetime | None] = mapped_column(DateTime)


class Atributo(Base):
    """Un dato que tiene una categoria. Ej: procesador -> socket (texto), nucleos (numero)."""

    __tablename__ = "atributos"
    __table_args__ = (Index("ux_atributos_categoria_codigo", "categoria_id", "codigo", unique=True),)

    id: Mapped[int] = mapped_column(primary_key=True)
    categoria_id: Mapped[int] = mapped_column(ForeignKey("categorias.id"))
    codigo: Mapped[str] = mapped_column(String(50))  # nombre interno: socket, vram_gb...
    nombre: Mapped[str] = mapped_column(String(100))  # como se muestra: Socket
    tipo: Mapped[str] = mapped_column(String(10))  # "texto" o "numero"
    unidad: Mapped[str | None] = mapped_column(String(20))  # GB, mm, MHz...


class ComponenteAtributo(Base):
    """El valor de un atributo para una pieza. Varios valores = varias filas."""

    __tablename__ = "componente_atributos"
    __table_args__ = (Index("ix_componente_atributos_componente_atributo", "componente_id", "atributo_id"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    componente_id: Mapped[int] = mapped_column(ForeignKey("componentes.id", ondelete="CASCADE"))
    atributo_id: Mapped[int] = mapped_column(ForeignKey("atributos.id"))
    valor_texto: Mapped[str | None] = mapped_column(String(100))  # si el tipo es texto
    valor_numero: Mapped[Decimal | None] = mapped_column(Numeric(12, 2))  # si es numero


# ---------- PRUEBAS DE RENDIMIENTO ----------


class Prueba(Base):
    """Catalogo de pruebas (Blender, compilar el kernel, un juego a 1440p...)."""

    __tablename__ = "pruebas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), unique=True)
    unidad: Mapped[str | None] = mapped_column(String(20))  # FPS, puntos, segundos
    mayor_es_mejor: Mapped[bool] = mapped_column(server_default=text("true"))
    metrica_id: Mapped[int | None] = mapped_column(ForeignKey("metricas.id"))


class PruebaRendimiento(Base):
    """El resultado de una prueba para una pieza."""

    __tablename__ = "pruebas_rendimiento"
    __table_args__ = (Index("ix_pruebas_rendimiento_componente_prueba", "componente_id", "prueba_id"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    componente_id: Mapped[int] = mapped_column(ForeignKey("componentes.id", ondelete="CASCADE"))
    prueba_id: Mapped[int] = mapped_column(ForeignKey("pruebas.id"))
    puntaje: Mapped[Decimal] = mapped_column(Numeric(12, 2))
    fuente_id: Mapped[int | None] = mapped_column(ForeignKey("fuentes_datos.id"))


# ---------- REGLAS DE COMPATIBILIDAD (editables desde el panel) ----------


class ReglaCompatibilidad(Base):
    """tipo "comparacion": la arma el admin comparando dos atributos.
    tipo "especial": esta programada en el backend; el admin solo la activa o desactiva.
    """

    __tablename__ = "reglas_compatibilidad"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100))
    tipo: Mapped[str] = mapped_column(String(15))  # comparacion o especial
    atributo_a_id: Mapped[int | None] = mapped_column(ForeignKey("atributos.id"))
    # igual, distinto, menor_o_igual, mayor_o_igual, esta_en_lista
    operador: Mapped[str | None] = mapped_column(String(20))
    atributo_b_id: Mapped[int | None] = mapped_column(ForeignKey("atributos.id"))
    codigo_especial: Mapped[str | None] = mapped_column(String(50))  # ej: potencia_fuente
    severidad: Mapped[str] = mapped_column(String(10), server_default="error")  # error o aviso
    mensaje: Mapped[str] = mapped_column(String(255))  # puede llevar {a} y {b}
    activa: Mapped[bool] = mapped_column(server_default=text("true"))
    creado_en: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    actualizado_en: Mapped[datetime | None] = mapped_column(DateTime)


# ---------- ARMADOS GUARDADOS ----------


class Armado(Base):
    __tablename__ = "armados"

    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    nombre: Mapped[str] = mapped_column(String(100))
    # Vacio = privado. Con valor, quien abra el link puede ver el armado y copiarlo.
    codigo_compartir: Mapped[str | None] = mapped_column(String(32), unique=True)
    creado_en: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class ArmadoComponente(Base):
    __tablename__ = "armado_componentes"

    armado_id: Mapped[int] = mapped_column(
        ForeignKey("armados.id", ondelete="CASCADE"), primary_key=True
    )
    componente_id: Mapped[int] = mapped_column(ForeignKey("componentes.id"), primary_key=True)
    cantidad: Mapped[int] = mapped_column(server_default=text("1"))  # ej: 2 modulos de RAM


# ---------- AUDITORIA (panel de administradores) ----------


class Auditoria(Base):
    """Solo cambios administrativos. Solo se agregan filas: nunca se editan ni se borran."""

    __tablename__ = "auditoria"
    __table_args__ = (
        Index("ix_auditoria_fecha", "fecha"),
        Index("ix_auditoria_administrador_id", "administrador_id"),
        Index("ix_auditoria_tabla_registro", "tabla_afectada", "registro_id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    administrador_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    accion: Mapped[str] = mapped_column(String(20))  # crear, editar, ocultar, restaurar, eliminar
    tabla_afectada: Mapped[str] = mapped_column(String(50))  # ej: componentes
    registro_id: Mapped[int | None]  # id de la fila afectada
    detalle: Mapped[dict | None] = mapped_column(JSONB)  # valores antes y despues
    fecha: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
