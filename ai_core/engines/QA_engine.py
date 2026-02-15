from .core import CoreBrain


class QnAEngine:

    def generate(self, industry, question, difficulty):

        keywords = CoreBrain.extract_keywords(question)

        intent = "General"
        if "security" in question.lower():
            intent = "Security"
        elif "compliance" in question.lower():
            intent = "Compliance"

        reasoning_depth = "Basic"
        if difficulty.lower() == "hard":
            reasoning_depth = "Advanced"

        recommendations = []

        # Intelligent contextual reasoning
        text = question.lower()

        if "token" in text:
            recommendations.append(
                "Implement token expiration policies and rotation mechanisms."
            )

        if "authentication" in text:
            recommendations.append(
                "Introduce multi-factor authentication (MFA) for sensitive operations."
            )

        if "audit" in text or "logs" in text:
            recommendations.append(
                "Enable tamper-proof audit logging and real-time monitoring."
            )

        if "fraud" in text:
            recommendations.append(
                "Deploy anomaly detection models for transaction monitoring."
            )

        if "encryption" in text:
            recommendations.append(
                "Ensure end-to-end encryption for sensitive financial data."
            )

        if "compliance" in text:
            recommendations.append(
                "Conduct regular compliance audits aligned with regulatory frameworks."
            )

        # Default fallback
        if not recommendations:
            recommendations.append(
                "Perform structured risk analysis and cross-functional evaluation."
            )

        assistant_response = {
            "summary": f"Analysis for {industry} domain question.",
            "core_answer": f"This question focuses on {intent} considerations within the {industry} sector.",
            "strategic_advice": " ".join(recommendations),
            "confidence_score": 80 if reasoning_depth == "Advanced" else 70
        }

        return {
            "analysis": {
                "industry": industry,
                "intent_detected": intent,
                "reasoning_depth": reasoning_depth,
                "keywords_detected": keywords
            },
            "assistant_response": assistant_response
        }