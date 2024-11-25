from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React

@app.route('/api/number-fact', methods=['POST'])
def get_number_fact():
    data = request.json  # Parse JSON input from React
    number = data.get('number')

    if not number or not number.isdigit():
        return jsonify({"error": "Please enter a valid number."}), 400

    # Fetch the fact from NumbersAPI
    try:
        response = requests.get(f'http://numbersapi.com/{number}')
        if response.status_code == 200:
            return jsonify({"fact": response.text})  # Return fact to React
        else:
            return jsonify({"error": "Unable to fetch fact from NumbersAPI."}), 500
    except Exception:
        return jsonify({"error": "An error occurred while fetching the fact."}), 500

if __name__ == '__main__':
    app.run(debug=True)
