from .core import CoreBrain


class TestCaseEngine:

    def generate(self, industry, feature, description, risk_level):

        keywords = CoreBrain.extract_keywords(description)
        complexity = CoreBrain.compute_complexity(description)
        base_risk = CoreBrain.risk_weight(risk_level)

        text = description.lower()

        # Context-aware risk amplification
        risk_score = base_risk

        if "fraud" in text:
            risk_score += 1

        if "authentication" in text or "token" in text:
            risk_score += 1

        if "compliance" in text:
            risk_score += 1

        risk_score = min(risk_score, 10)

        risk_category = "Low"
        if risk_score > 7:
            risk_category = "High"
        elif risk_score > 4:
            risk_category = "Medium"

        # Functional tests
        functional_tests = [
            f"Validate {feature} executes successfully.",
            "Verify role-based access control."
        ]

        # Context-aware additions
        if "fraud" in text:
            functional_tests.append("Validate fraud detection logic under abnormal transactions.")

        if "authentication" in text or "token" in text:
            functional_tests.append("Verify token validation and expiration handling.")

        if "audit" in text or "logs" in text:
            functional_tests.append("Validate audit logging integrity and tamper resistance.")

        # Edge cases
        edge_cases = []
        if complexity > 6:
            edge_cases.append("Test boundary conditions.")
            edge_cases.append("Simulate peak load handling.")

        # Negative cases
        negative_cases = []
        if risk_score > 6:
            negative_cases.append("Test unauthorized access attempts.")
            negative_cases.append("Simulate data manipulation attacks.")

        # Risk insights
        risks_identified = []

        if "fraud" in text:
            risks_identified.append("Fraud exploitation risk detected.")

        if "audit" in text:
            risks_identified.append("Audit logging integrity risk.")

        if "authentication" in text:
            risks_identified.append("Authentication bypass vulnerability risk.")

        if not risks_identified:
            risks_identified.append("General operational risk.")

        assistant_response = {
            "summary": f"Test strategy generated for {feature} in {industry}.",
            "reasoning": f"Operational risk level is {risk_category}.",
            "risks_identified": risks_identified,
            "recommendations": [
                "Increase negative test scenarios.",
                "Perform structured regression validation.",
                "Integrate automated security testing early."
            ],
            "confidence_score": 85 if risk_category == "High" else 75
        }

        return {
            "analysis": {
                "industry": industry,
                "complexity_score": round(complexity, 2),
                "risk_score": risk_score,
                "risk_category": risk_category,
                "estimated_test_coverage_percent": int(60 + complexity * 5),
                "automation_feasibility_percent": int(80 - complexity * 3)
            },
            "assistant_response": assistant_response
        }