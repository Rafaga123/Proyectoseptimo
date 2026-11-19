from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import get_db

# Ya no se crean las tablas al arrancar: de eso se encarga Alembic (alembic upgrade head).
app = FastAPI(title="PC Builder API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/health/db")
def health_db(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))  # si la conexion falla, aqui explota
    return {"database": "ok"}
