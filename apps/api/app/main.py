from fastapi import FastAPI

app = FastAPI(title="PC Builder API")


@app.get("/health")
def health():
    return {"status": "ok"}