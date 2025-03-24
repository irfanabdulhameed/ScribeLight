import React, { useState, useRef, useEffect } from 'react';
import { Loader } from 'lucide-react';

const Chatbox = ({ transcript }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const chatRef = useRef(null);
  const minimapRef = useRef(null);

  useEffect(() => {
    if (transcript) {
      setMessages([{ type: 'transcript', content: transcript }]);
    }
  }, [transcript]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/process-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
          transcript,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process text');
      }

      setMessages(prev => [...prev, { type: 'ai', content: data.processed_text }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'error', content: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleHighlight = (text) => {
    setHighlightedText(text);
  };

  const renderMessage = (message, index) => {
    const isHighlighted = highlightedText && message.content.includes(highlightedText);

    return (
      <div
        key={index}
        className={`p-4 rounded-lg mb-4 ${
          message.type === 'user'
            ? 'bg-blue-600 ml-auto max-w-[80%]'
            : message.type === 'ai'
            ? 'bg-neutral-800 mr-auto max-w-[80%]'
            : message.type === 'transcript'
            ? 'bg-neutral-700 w-full'
            : 'bg-red-600 text-white'
        }`}
      >
        {message.type === 'transcript' ? (
          <div className="prose prose-invert max-w-none">
            {message.content.split(' ').map((word, i) => (
              <span
                key={i}
                className={`cursor-pointer hover:bg-yellow-500/20 ${
                  isHighlighted && word === highlightedText ? 'bg-yellow-500/30' : ''
                }`}
                onClick={() => handleHighlight(word)}
              >
                {word}{' '}
              </span>
            ))}
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4" ref={chatRef}>
        {messages.map((message, index) => renderMessage(message, index))}
        {loading && (
          <div className="flex items-center gap-2 text-neutral-400">
            <Loader className="w-4 h-4 animate-spin" />
            <span>AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Minimap */}
      <div className="w-48 border-l border-neutral-700 overflow-hidden">
        <div
          ref={minimapRef}
          className="h-full overflow-y-auto text-xs text-neutral-400 p-2"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-1 ${
                message.type === 'user' ? 'text-blue-400' : 'text-neutral-500'
              }`}
            >
              {message.content.substring(0, 50)}...
            </div>
          ))}
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 bg-neutral-900 border-t border-neutral-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the video..."
            className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
