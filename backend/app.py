from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import yt_dlp
import whisper
import tempfile

app = Flask(__name__)
# Configure CORS properly
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# Add a route to handle OPTIONS requests explicitly
@app.route('/api/transcribe', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    return response

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini with the new client approach
client = genai.Client(api_key=GEMINI_API_KEY)

# Initialize Whisper model for transcription
whisper_model = whisper.load_model("base")

@app.route('/api/transcribe', methods=['POST'])
def transcribe_video():
    data = request.json
    video_url = data.get('url')

    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        # Download audio from YouTube
        with tempfile.TemporaryDirectory() as temp_dir:
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': os.path.join(temp_dir, '%(id)s.%(ext)s'),
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                }],
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([video_url])
                info = ydl.extract_info(video_url, download=False)
                audio_path = os.path.join(temp_dir, f"{info['id']}.mp3")

            # Transcribe audio
            result = whisper_model.transcribe(audio_path)
            transcript = result["text"]

        return jsonify({"transcript": transcript})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/process-text', methods=['POST'])
def process_text():
    data = request.json
    user_input = data.get('text')
    transcript = data.get('transcript')

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        # Create a prompt for Gemini using the new approach
        prompt = f"""
        You are a helpful AI assistant that can answer questions about a YouTube video.
        Here is the transcript of the video:
        {transcript}

        User's question: {user_input}

        Provide a concise and accurate response based on the transcript.
        If the answer is not in the transcript, say so.
        """
        
        # Set up the content and configuration
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=prompt),
                ],
            ),
        ]
        
        generate_content_config = types.GenerateContentConfig(
            temperature=0.7,
            top_p=0.95,
            top_k=40,
            max_output_tokens=2048,
            response_mime_type="text/plain",
        )
        
        # Get response from Gemini using the newer model
        response = client.models.generate_content(
            model="gemini-2.0-flash",  # You can also try "gemini-2.0-flash" if available
            contents=contents,
            config=generate_content_config,
        )
        
        return jsonify({"processed_text": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)