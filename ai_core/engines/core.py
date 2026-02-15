import re

class CoreBrain:

    @staticmethod
    def extract_keywords(text):
        words = re.findall(r'\b\w+\b', text.lower())
        return list(set(words))

    @staticmethod
    def compute_complexity(text):
        length_score = len(text.split()) / 8
        keyword_bonus = 0

        advanced_terms = [
            "integration", "compliance", "real-time",
            "encryption", "scalability", "distributed"
        ]

        for term in advanced_terms:
            if term in text.lower():
                keyword_bonus += 1.5

        return min(10, length_score + keyword_bonus)

    @staticmethod
    def risk_weight(level):
        weights = {
            "low": 2,
            "medium": 5,
            "high": 8
        }
        return weights.get(level.lower(), 5)