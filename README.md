# Lavendrix-AI

Lavendrix-AI is a sector-aware release intelligence prototype that evaluates release risk across industries (Healthcare, FinTech, EdTech, eCommerce, IT). The project separates UI, upload/processing, and AI logic: a React frontend, a Node/Express backend for uploads, and a Python FastAPI microservice for deterministic AI endpoints.

**Quick Highlights**
- Industry engines: healthcare, fintech, edtech, ecommerce, IT
- Upload → analyze → insights pipeline
- FastAPI AI core (deterministic endpoints, docs at `/docs`)
- Dashboards per sector with centralized Generate action

**Repository layout**
- Backend/
  - backend/       — Node/Express upload API, models, routes (MongoDB persistence)
  - ai_core/       — FastAPI microservice providing analysis endpoints (runs on :8000)
- Frontend/
  - frontend/      — React + Vite UI (dashboards, upload, history, insights)

**Prerequisites**
- Node.js (16+)
- Python 3.10+
- MongoDB (local or cloud URI)
- git

**Local setup (recommended order)**

1) Start MongoDB and note the connection URI (e.g. `mongodb://localhost:27017/lavendrix`).

2) Backend (Node upload service)

```bash
cd Backend/backend
npm install
# set env variables: MONGO_URI, PORT (optional)
npm run dev   # or: node server.js
```

3) AI core (FastAPI)

```bash
cd Backend/ai_core
python -m venv .venv
.\.venv\Scripts\activate   # Windows
pip install fastapi uvicorn python-multipart pydantic
# then run
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

Open `http://localhost:8000/docs` to view the FastAPI Swagger UI and try endpoints such as:
- POST `/api/analysis/generate-testcases`
- POST `/api/analysis/generate-qa`
- POST `/api/analysis/generate-pm`
- GET `/api/analysis/insights/{industry}`

4) Frontend (React + Vite)

```bash
cd Frontend/frontend
npm install
npm run dev
```

Visit the frontend (Vite dev server URL printed in terminal). Upload files via the sector dashboards to run analyses. The `Generate` control will open the FastAPI docs by default (or trigger the configured AI endpoints).

**What I changed / current notes**
- JS heuristic AI was deprecated in favor of a Python FastAPI microservice (kept models for history).
- FastAPI is located at `Backend/ai_core/api.py` and serves basic deterministic analysis endpoints.
- Dashboards were updated to remove the local FastAPI banner, centralize Upload and action buttons, and show a small inline message when `Generate` is triggered.
- A local Git branch `Lavandrix` was created and pushed to `https://github.com/Lavendrix-AI/Lavendrix-AI`.

**High-impact next steps (recommended)**
1. Add a Release Decision engine (Safe / Warning / Block) and persist `decision` into analysis records.
2. Implement Upload Compare flow (A vs B) and a visual diff pipeline.
3. Add Risk timeline / history UI and `GET /api/analysis/history/:project` endpoint.
4. Provide a sample demo flow and downloadable report export (PDF/JSON).

**Contributing**
Contributions welcome — open an issue or submit a PR against branch `Lavandrix`.

**License**
MIT