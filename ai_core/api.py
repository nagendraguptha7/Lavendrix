from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import numpy as np
import io

from .memory_db import init_db
from .analytics_db import (
    init_analytics_db,
    insert_defect,
    get_defect_dashboard
)
from .brain import LavendrixBrain

app = FastAPI(title="Lavendrix AI Core")

app.add_middleware(
    CORSMiddleware,
    
    allow_credentials=True,
    allow_origins=["http://localhost:5173","http://localhost:5174"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize databases
init_db()
init_analytics_db()

brain = LavendrixBrain()


# ---------------- REQUEST MODELS ----------------

class TestCaseRequest(BaseModel):
    session_id: str
    industry: str
    feature: str
    description: str
    risk_level: str


class QnARequest(BaseModel):
    session_id: str
    industry: str
    question: str
    difficulty: str


class PMRequest(BaseModel):
    session_id: str
    industry: str
    description: str
    timeline_weeks: int
    team_size: int


class DefectRequest(BaseModel):
    session_id: str
    industry: str
    module_name: str
    severity: str


# ---------------- CORE ROUTES ----------------

@app.post("/generate-testcases")
def generate_testcases(data: TestCaseRequest):
    return brain.generate_testcases(
        data.session_id,
        data.industry,
        data.feature,
        data.description,
        data.risk_level
    )


@app.post("/generate-qa")
def generate_qa(data: QnARequest):
    return brain.generate_qa(
        data.session_id,
        data.industry,
        data.question,
        data.difficulty
    )


@app.post("/generate-pm")
def generate_pm(data: PMRequest):
    return brain.generate_pm(
        data.session_id,
        data.industry,
        data.description,
        data.timeline_weeks,
        data.team_size
    )


@app.get("/")
def root():
    return {"message": "Lavendrix AI Brain Running"}


# ---------------- DEFECT MANAGEMENT ----------------

@app.post("/log-defect")
def log_defect(data: DefectRequest):
    insert_defect(
        data.session_id,
        data.industry,
        data.module_name,
        data.severity
    )
    return {"status": "Defect logged successfully"}


@app.get("/defect-dashboard/{session_id}")
def defect_dashboard(session_id: str):
    return get_defect_dashboard(session_id)


# ---------------- VISION-BASED UI QA ----------------

@app.post("/compare-ui")
async def compare_ui(
    session_id: str,
    industry: str,
    module_name: str,
    baseline: UploadFile = File(...),
    current: UploadFile = File(...)
):
    try:
        baseline_bytes = await baseline.read()
        current_bytes = await current.read()

        baseline_img = Image.open(io.BytesIO(baseline_bytes)).convert("RGB")
        current_img = Image.open(io.BytesIO(current_bytes)).convert("RGB")

        if baseline_img.size != current_img.size:
            current_img =current_img.resize(baseline_img.size)

        baseline_array = np.array(baseline_img)
        current_array = np.array(current_img)

        diff = np.abs(baseline_array - current_array)
        diff_score = np.mean(diff)

        similarity_percent = max(0, 100 - (diff_score / 255) * 100)
        difference_percent = 100 - similarity_percent

        similarity_percent = float(round(similarity_percent, 2))
        difference_percent = float(round(difference_percent, 2))

        regression_flag = bool(difference_percent > 5)

        severity = "LOW"
        if difference_percent > 20:
         severity = "HIGH"
        elif difference_percent > 10:
         severity = "MEDIUM"

        # 🔥 AUTO DEFECT LOGGING IF REGRESSION DETECTED
        if regression_flag:
            insert_defect(
                session_id=session_id,
                industry=industry,
                module_name=module_name,
                severity=severity
            )

        message = "UI looks stable."
        if regression_flag:
            message = f"Visual regression detected with {severity} severity."

        return {
            "visual_analysis": {
                "similarity_percent": round(similarity_percent, 2),
                "difference_percent": round(difference_percent, 2),
                "visual_regression_detected": regression_flag,
                "regression_severity": severity
            },
            "summary": message
        }

    except Exception as e:
        return {"error": str(e)}