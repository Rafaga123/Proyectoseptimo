import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# Lee el archivo .env y lo convierte en variables de entorno.
load_dotenv()

# Valor por defecto solo para desarrollo; lo normal es definirlo en .env
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://postgres:postgres@localhost:5432/pcbuilder",
)

# El "engine" es la conexion a la base de datos (no se conecta hasta que se usa).
engine = create_engine(DATABASE_URL)

# Cada peticion a la API abre una "sesion" para hablar con la base de datos.
SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    """Todas las tablas heredan de esta clase."""


def get_db():
    """Entrega una sesion y la cierra al terminar la peticion."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
