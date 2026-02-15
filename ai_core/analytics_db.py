import sqlite3
from datetime import datetime

DB_NAME = "analytics.db"


def init_analytics_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Project snapshots table (PM analytics)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS project_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            industry TEXT,
            avg_complexity REAL,
            avg_risk REAL,
            delay_probability REAL,
            created_at TEXT
        )
    """)

    # Defects table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS defects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            industry TEXT,
            module_name TEXT,
            severity TEXT,
            created_at TEXT
        )
    """)

    conn.commit()
    conn.close()


# ---------------- PROJECT SNAPSHOT ----------------

def insert_project_snapshot(session_id, industry, avg_complexity, avg_risk, delay_probability):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO project_snapshots
        (session_id, industry, avg_complexity, avg_risk, delay_probability, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        session_id,
        industry,
        avg_complexity,
        avg_risk,
        delay_probability,
        datetime.utcnow().isoformat()
    ))

    conn.commit()
    conn.close()


def get_industry_baseline(industry):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT AVG(avg_complexity), AVG(avg_risk)
        FROM project_snapshots
        WHERE industry = ?
    """, (industry,))

    row = cursor.fetchone()
    conn.close()

    if row and row[0] is not None:
        return {
            "avg_complexity": row[0],
            "avg_risk": row[1]
        }

    return None


# ---------------- DEFECT ANALYTICS ----------------

def insert_defect(session_id, industry, module_name, severity):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO defects
        (session_id, industry, module_name, severity, created_at)
        VALUES (?, ?, ?, ?, ?)
    """, (
        session_id,
        industry,
        module_name,
        severity,
        datetime.utcnow().isoformat()
    ))

    conn.commit()
    conn.close()


def get_defect_dashboard(session_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Total defects
    cursor.execute("""
        SELECT COUNT(*) FROM defects WHERE session_id = ?
    """, (session_id,))
    total_defects = cursor.fetchone()[0]

    # High severity defects
    cursor.execute("""
        SELECT COUNT(*) FROM defects
        WHERE session_id = ? AND severity = 'HIGH'
    """, (session_id,))
    high_severity = cursor.fetchone()[0]

    # Most affected module
    cursor.execute("""
        SELECT module_name, COUNT(*) as count
        FROM defects
        WHERE session_id = ?
        GROUP BY module_name
        ORDER BY count DESC
        LIMIT 1
    """, (session_id,))
    row = cursor.fetchone()
    hotspot_module = row[0] if row else None

    # Release readiness calculation
    if total_defects == 0:
        readiness_score = 90
    else:
        readiness_score = max(
            50,
            100 - (high_severity * 8) - (total_defects * 2)
        )

    release_status = "READY"
    if readiness_score < 75:
        release_status = "NOT READY"

    conn.close()

    return {
        "total_bugs_detected": total_defects,
        "high_severity_bugs": high_severity,
        "most_affected_module": hotspot_module,
        "release_readiness_score": readiness_score,
        "release_status": release_status
    }