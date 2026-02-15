from .core import CoreBrain


class PMEngine:

    def generate(self, industry, description, timeline_weeks, team_size):

        complexity = CoreBrain.compute_complexity(description)
        text = description.lower()

        workload_pressure = (complexity * timeline_weeks) / max(team_size, 1)

        # Context-aware workload amplification
        if "fraud" in text:
            workload_pressure += 2

        if "compliance" in text:
            workload_pressure += 2

        if "encryption" in text:
            workload_pressure += 1

        # Delivery probability logic
        delivery_probability = max(50, 95 - workload_pressure)

        recommended_sprints = max(2, int(timeline_weeks / 2))

        risk_warning = ""
        if delivery_probability < 70:
            risk_warning = "High delivery risk due to workload and compliance pressure."

        assistant_response = {
            "summary": f"Project feasibility analysis for {industry}.",
            "risk_warning": risk_warning,
            "recommendation": "Adopt agile execution with milestone checkpoints and early QA integration.",
            "confidence_score": 85 if delivery_probability > 75 else 70
        }

        return {
            "analysis": {
                "industry": industry,
                "complexity_score": round(complexity, 2),
                "workload_pressure_index": round(workload_pressure, 2),
                "delivery_probability_percent": round(delivery_probability, 2),
                "recommended_sprints": recommended_sprints
            },
            "assistant_response": assistant_response
        }