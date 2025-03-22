from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

@app.route('/api/process-text', methods=['POST'])
def process_text():
    data = request.json
    user_input = data.get('text')
    transcript = data.get('transcript')

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        # Create a prompt for Gemini
        prompt = f"""
        You are a helpful AI assistant that can answer questions about a YouTube video.
        Here is the transcript of the video:
        {transcript}

        User's question: {user_input}

        Provide a concise and accurate response based on the transcript.
        """

        # Get response from Gemini
        response = model.generate_content(prompt)
        return jsonify({"processed_text": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)