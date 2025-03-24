import React, { useState } from 'react';
import { Loader } from 'lucide-react';

const Ytinput = ({ onTranscriptReceived }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
    </div>
  );
};

export default Ytinput;
