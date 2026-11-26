from pathlib import Path
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

ROOT = Path(__file__).resolve().parents[2]
CATALOG = ROOT / "data" / "control_catalog.json"
app = FastAPI(title="Enterprise Readiness API", version="0.1.0", description="Starter API; authentication and persistence are not yet implemented.")
# Local development only. Replace with exact trusted origins before deployment.
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["GET"], allow_headers=["*"])

@app.get("/health")
def health():
    return {"status": "ok", "service": "enterprise-readiness-api", "stage": "starter"}

@app.get("/api/v1/domains")
def domains():
    data=json.loads(CATALOG.read_text())
    return [{"id": s["name"], "name": s["name"], "control_count": len(s["items"])} for s in data["sections"]]

@app.get("/api/v1/controls")
def controls(domain: str | None = None):
    data=json.loads(CATALOG.read_text())
    rows=[]
    for section in data["sections"]:
        if domain and section["name"].casefold()!=domain.casefold():
            continue
        for item in section["items"]:
            rows.append({"domain": section["name"], **item})
    return {"count": len(rows), "items": rows}
