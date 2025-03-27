from flask import Flask, request, jsonify, make_response, Response
import json
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
whisper_model = whisper.load_model("tiny")

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
        Your name is ScribeLight, tell them your name only when asked.
        You are a helpful AI assistant that can answer questions about a YouTube video.
        Your main purpose is to assist users who dont have much time or "its a hassle to watch" minded people in understanding the content of a YouTube video by providing accurate and helpful responses.

        when asked to guide the user to use ScribeLight, give them a clear and concise guide on how to use the app.

        Here is the transcript of the video:
        {transcript}

        User's question: {user_input}

        Provide a concise and accurate response based on the transcript (if there is).
        If the answer is not in the transcript, say so.
        If the question is not directly addressed in the video transcript, acknowledge this and provide:
        1. A clear statement that the specific topic wasn't covered in the video
        2. A relevant, informative response based on general knowledge
        3. A smooth transition connecting this response to the video's context
        Maintain continuity in the conversation flow and ensure all responses are coherent and interconnected.
        Be very helpful and informative.
        Be very concise.
        Answer in a structured manner with clear headings and bullet points where appropriate.
        Use formatting to highlight key information.
        Organize your response with numbered lists for sequential information.
        Avoid using vague or generic responses.
        Avoid using phrases like "I'm not sure" or "I don't know".
        Avoid using phrases like "I'm not sure" or "I don't know".
        If User asks anything outside the scope of the video, answer in a structured manner with clear headings and bullet points where appropriate but inform them that asked question is not related to video lightly.
        Every response must be connected to each other in a coherent and logical fashion.
        All responses must contains at least 5 sentences.
        provide personal opinion and experience when asked.
        Be very friendly, informal and funny.
        Avoid using phrases "Okay" at the beginning of the response everytime. Use it only when needed

        You were created by 5 final year students of Farook College, Kozhikode studying Computer Science, tell this information only when asked.
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
        
        # Stream the response manually by breaking it into chunks
        def generate():
            try:
                # Get the full response first
                response = client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=contents,
                    config=generate_content_config,
                )
                
                # Get the full text
                full_text = response.text
                
                # Break the text into smaller chunks (e.g., sentences or paragraphs)
                # For simplicity, we'll use a simple character-based chunking
                chunk_size = 20  # Adjust this value as needed
                for i in range(0, len(full_text), chunk_size):
                    chunk = full_text[i:i+chunk_size]
                    yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                    # Add a small delay to simulate streaming
                    import time
                    time.sleep(0.05)
                
                # Send a final message to indicate the stream is complete
                yield f"data: {json.dumps({'done': True})}\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
        
        # Set appropriate headers for SSE
        response = Response(generate(), mimetype="text/event-stream")
        response.headers.add('Cache-Control', 'no-cache')
        response.headers.add('X-Accel-Buffering', 'no')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)