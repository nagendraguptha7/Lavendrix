from .engines.test_cases_engine import TestCaseEngine
from .engines.QA_engine import QnAEngine
from .engines.pm_engine import PMEngine

def test_all():

    test_engine = TestCaseEngine()
    qa_engine = QnAEngine()
    pm_engine = PMEngine()

    print("\n--- TEST CASE ENGINE ---")
    print(test_engine.generate(
        industry="FinTech",
        feature="Loan Approval System",
        description="Real-time risk scoring with compliance validation",
        risk_level="High"
    ))

    print("\n--- QnA ENGINE ---")
    print(qa_engine.generate(
        industry="Healthcare",
        question="How to ensure patient data privacy?",
        difficulty="Hard"
    ))

    print("\n--- PM ENGINE ---")
    print(pm_engine.generate(
        industry="E-Commerce",
        description="Scalable payment integration with distributed services",
        timeline_weeks=8,
        team_size=3
    ))

if __name__ == "__main__":
    test_all()