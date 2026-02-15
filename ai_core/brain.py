import re
from .memory_db import get_session, save_session


class LavendrixBrain:

    def __init__(self):
        pass

    # ---------------- CORE HELPERS ----------------

    def _extract_keywords(self, text):
        return re.findall(r'\b[a-zA-Z]{4,}\b', text.lower())

    def _compute_complexity(self, text):
        word_count = len(text.split())
        unique_words = len(set(text.split()))
        return round((unique_words / (word_count + 1)) * 10, 2)

    def _risk_weight(self, risk_level):
        risk_map = {"low": 3, "medium": 5, "high": 8}
        return risk_map.get(risk_level.lower(), 5)

    def _detect_intent(self, text):
        text = text.lower()

        if any(k in text for k in ["security", "authentication", "token", "fraud"]):
            return "Security"

        if any(k in text for k in ["audit", "compliance", "regulation"]):
            return "Compliance"

        if any(k in text for k in ["performance", "load", "scale", "latency"]):
            return "Performance"

        return "Strategy"

    # ---------------- TEST ENGINE ----------------

    def generate_testcases(self, session_id, industry, feature, description, risk_level):

        session = get_session(session_id)

        complexity = self._compute_complexity(description)
        risk_score = self._risk_weight(risk_level)

        session["risk_history"].append(risk_score)
        session["complexity_history"].append(complexity)

        save_session(
            session_id,
            session["risk_history"],
            session["complexity_history"],
            session["project_context"]
        )

        severity = "LOW"
        if risk_score >= 7:
            severity = "HIGH"
        elif risk_score >= 5:
            severity = "MEDIUM"

        return {
            "analysis": {
                "industry": industry,
                "feature": feature,
                "risk_score": risk_score,
                "complexity_score": complexity,
                "risk_severity": severity
            },
            "assistant_response": {
                "summary": f"Test strategy prepared for {feature} in {industry}.",
                "recommendation": "Expand negative test coverage and integrate automated regression.",
                "confidence_score": 85
            }
        }

    # ---------------- QA ENGINE ----------------

    def generate_qa(self, session_id, industry, question, difficulty):

        session = get_session(session_id)

        keywords = self._extract_keywords(question)
        intent = self._detect_intent(question)

        session["project_context"] += " " + question

        save_session(
            session_id,
            session["risk_history"],
            session["complexity_history"],
            session["project_context"]
        )

        return {
            "analysis": {
                "industry": industry,
                "intent_detected": intent,
                "difficulty": difficulty,
                "keywords_detected": keywords
            },
            "assistant_response": {
                "summary": f"{intent} advisory generated for {industry}.",
                "core_answer": f"Focus on strengthening {intent.lower()} controls and governance.",
                "confidence_score": 88
            }
        }

    # ---------------- PM ENGINE ----------------

    def generate_pm(self, session_id, industry, description, timeline_weeks, team_size):

        complexity = self._compute_complexity(description)

        workload_index = complexity * team_size
        delivery_probability = max(50, 100 - workload_index)

        return {
            "analysis": {
                "industry": industry,
                "complexity_score": complexity,
                "timeline_weeks": timeline_weeks,
                "team_size": team_size,
                "delivery_probability_percent": round(delivery_probability, 2)
            },
            "assistant_response": {
                "summary": f"Project feasibility evaluated for {industry}.",
                "recommendation": "Adopt milestone-based agile planning with early QA integration.",
                "confidence_score": 90
            }
        }