from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
import yt_dlp
import whisper
import tempfile

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

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
        # Create a prompt for Gemini
        prompt = f"""
        You are a helpful AI assistant that can answer questions about a YouTube video.
        Here is the transcript of the video:
        {transcript}

        User's question: {user_input}

        Provide a concise and accurate response based on the transcript.
        If the answer is not in the transcript, say so.
        """

        # Get response from Gemini
        response = model.generate_content(prompt)
        return jsonify({"processed_text": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)