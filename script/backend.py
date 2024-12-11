from flask import Flask, request, jsonify
from flask_cors import CORS
from app import CarAdviceGenerator  # Import our previous script
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the CarAdviceGenerator
car_advisor = CarAdviceGenerator()

@app.route('/api/car-advice', methods=['POST'])
def get_car_advice():
    try:
        # Get form data from request
        form_data = request.json
        
        # Validate required fields
        required_fields = ['expertiseLevel', 'carMake', 'carModel', 'carYear']
        for field in required_fields:
            if not form_data.get(field):
                return jsonify({
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Get advice using our CarAdviceGenerator
        advice = car_advisor.get_advice(form_data)
        
        return jsonify({
            'success': True,
            'advice': advice
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
