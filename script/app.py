import os
import json
from openai import OpenAI
from typing import Dict, Optional
from dotenv import load_dotenv, dotenv_values

class CarAdviceGenerator:
    def __init__(self):
        load_dotenv()
        openai_key = os.getenv('OPENAI_API_KEY')
        self.client = OpenAI(api_key=openai_key)

    def generate_prompt(self, form_data: Dict[str, str]) -> str:
        """
        Generate a detailed prompt based on the form data.
        """
        expertise_level = form_data.get('expertiseLevel', 'beginner')
        car_make = form_data.get('carMake', '')
        car_model = form_data.get('carModel', '')
        car_year = form_data.get('carYear', '')
        additional_notes = form_data.get('additionalNotes', '')

        prompt = f"""As a car buying expert, provide detailed advice for someone interested in purchasing a used {car_year} {car_make} {car_model}.

Background Information:
- Buyer's expertise level with cars: {expertise_level}
- Additional context: {additional_notes}

Please structure your response as valid JSON data with the following format:

{{
    "vehicle_details": {{
        "make": "{car_make}",
        "model": "{car_model}",
        "year": "{car_year}",
        "buyer_expertise": "{expertise_level}"
    }},
    "common_issues": [
        {{
            "issue": "string",
            "description": "string",
            "severity": "string"
        }}
    ],
    "price_information": {{
        "expected_range": {{
            "low": number,
            "high": number,
            "currency": "USD"
        }},
        "price_factors": [
            {{
                "factor": "string",
                "impact": "string"
            }}
        ]
    }},
    "inspection_checklist": [
        {{
            "area": "string",
            "details": "string",
            "priority": "string"
        }}
    ],
    "pre_purchase_checks": [
        {{
            "check": "string",
            "importance": "string",
            "estimated_cost": "string"
        }}
    ],
    "negotiation_tips": [
        {{
            "tip": "string",
            "explanation": "string"
        }}
    ],
    "alternative_vehicles": [
        {{
            "make": "string",
            "model": "string",
            "year_range": "string",
            "reason": "string"
        }}
    ]
}}

Ensure all responses are appropriate for a {expertise_level}-level car buyer."""

        return prompt

    def get_advice(self, form_data: Dict[str, str]) -> Dict:
        """
        Get car buying advice using the OpenAI API and return as JSON.
        """
        prompt = self.generate_prompt(form_data)
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an experienced car buying expert who provides detailed, practical advice for purchasing used vehicles. You must respond with valid JSON data following the exact structure specified in the user's prompt."
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=1500
            )
            
            # Get the response content and parse it as JSON
            response_text = response.choices[0].message.content
            try:
                advice_json = json.loads(response_text)
                return advice_json
            except json.JSONDecodeError as e:
                return {
                    "error": True,
                    "message": f"Error parsing JSON response: {str(e)}"
                }
            
        except Exception as e:
            return {
                "error": True,
                "message": f"Error generating advice: {str(e)}"
            }

def main():
    """
    Example usage of the CarAdviceGenerator
    """
    # Sample form data
    form_data = {
        'expertiseLevel': 'beginner',
        'carMake': 'Toyota',
        'carModel': 'Camry',
        'carYear': '2018',
        'additionalNotes': 'Looking for a reliable family car, concerned about maintenance costs'
    }
    
    try:
        # Initialize the advice generator
        advisor = CarAdviceGenerator()
        
        # Get the advice
        advice_json = advisor.get_advice(form_data)
        
        # Print the advice in a formatted JSON
        print("\nCar Buying Advice:")
        print("-" * 50)
        print(json.dumps(advice_json, indent=2))
        
    except Exception as e:
        print(json.dumps({
            "error": True,
            "message": f"An error occurred: {str(e)}"
        }, indent=2))

if __name__ == "__main__":
    main()
