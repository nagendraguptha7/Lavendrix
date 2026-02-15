import sqlite3
import json

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, "brain_memory.db")


def init_db():
    print(">>> INIT_DB CALLED <<<")

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            session_id TEXT PRIMARY KEY,
            risk_history TEXT,
            complexity_history TEXT,
            project_context TEXT,
            conversation_count INTEGER,
            last_intent TEXT
        )
    """)

    conn.commit()
    conn.close()


def get_session(session_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT risk_history, complexity_history, project_context,
               conversation_count, last_intent
        FROM sessions WHERE session_id = ?
    """, (session_id,))

    row = cursor.fetchone()
    conn.close()

    if row:
        return {
            "risk_history": json.loads(row[0]) if row[0] else [],
            "complexity_history": json.loads(row[1]) if row[1] else [],
            "project_context": row[2] if row[2] else "",
            "conversation_count": row[3] if row[3] else 0,
            "last_intent": row[4] if row[4] else ""
        }

    return {
        "risk_history": [],
        "complexity_history": [],
        "project_context": "",
        "conversation_count": 0,
        "last_intent": ""
    }


def save_session(session_id, risk_history, complexity_history,
                 project_context="", conversation_count=0, last_intent=""):

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT OR REPLACE INTO sessions
        (session_id, risk_history, complexity_history,
         project_context, conversation_count, last_intent)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        session_id,
        json.dumps(risk_history),
        json.dumps(complexity_history),
        project_context,
        conversation_count,
        last_intent
    ))

    conn.commit()
    conn.close()
