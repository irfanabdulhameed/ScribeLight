import React, { useState } from 'react';
import { Loader } from 'lucide-react';

const Ytinput = ({ onTranscriptReceived }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoId, setVideoId] = useState('');
  
  // Extract video ID from YouTube URL
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    const newVideoId = extractVideoId(newUrl);
    setVideoId(newVideoId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        // More specific error handling based on error type
        if (data.error && data.error.includes('ffprobe and ffmpeg not found')) {
          throw new Error('Server missing required dependencies (ffmpeg). Please contact support.');
        } else {
          throw new Error(data.error || 'Failed to transcribe video');
        }
      }

      onTranscriptReceived(data.transcript);
    } catch (err) {
      console.error('Transcription error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 transition transition all duration-700">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter YouTube URL"
            className="flex-1 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm border border-neutral-700 font-normal outline-none border-t-gray-500/50 border-l-gray-500/50 border-b-gray-800/50 border-r-gray-800/50 border"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-1 bg-[linear-gradient(to_right,#ef4444,#b91c1c)] hover:bg-[linear-gradient(to_right,#dc2626,#991b1b)] text-white rounded-xl transition-all duration-700 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border-t-red-300 border-l-red-300 border-b-red-700 border-r-red-700 border"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Transcribe'
            )}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </form>
      {videoId && (
        <div className="mt-4 aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Ytinput;
