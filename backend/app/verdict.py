def generate_verdict(rating: float):

    if rating >= 4.5:
        return {
            "stars": 5,
            "grade": "A+",
            "verdict": "Outstanding Restaurant",
            "summary": "Excellent restaurant with outstanding customer satisfaction."
        }

    elif rating >= 4.0:
        return {
            "stars": 4,
            "grade": "A",
            "verdict": "Excellent Restaurant",
            "summary": "Highly recommended with consistently positive customer reviews."
        }

    elif rating >= 3.5:
        return {
            "stars": 4,
            "grade": "B",
            "verdict": "Good Restaurant",
            "summary": "Good food and service with room for improvement."
        }

    elif rating >= 3.0:
        return {
            "stars": 3,
            "grade": "C",
            "verdict": "Average Restaurant",
            "summary": "Average experience based on available features."
        }

    elif rating >= 2.0:
        return {
            "stars": 2,
            "grade": "D",
            "verdict": "Below Average",
            "summary": "Needs improvement in several areas."
        }

    else:
        return {
            "stars": 1,
            "grade": "F",
            "verdict": "Poor Restaurant",
            "summary": "Predicted to receive low customer ratings."
        }