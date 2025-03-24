import React, { useState, useRef, useEffect } from 'react';
import { Loader, Eye, EyeOff, Edit } from 'lucide-react';

const Chatbox = ({ transcript }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (transcript) {
      setMessages([{ type: 'transcript', content: transcript }, { type: 'ai', content: 'Transcript has been updated'}]);
      setEditedTranscript(transcript);
    }
  }, [transcript]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/process-text', {
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

  const toggleTranscript = () => {
    setShowTranscript(prev => !prev);
    if (isEditingTranscript) {
      setIsEditingTranscript(false);
    }
  };

  const toggleEditTranscript = () => {
    setIsEditingTranscript(prev => !prev);
    if (!showTranscript) {
      setShowTranscript(true);
    }
  };

  const saveEditedTranscript = () => {
    setMessages(prev => 
      prev.map(msg => 
        msg.type === 'transcript' ? { ...msg, content: editedTranscript } : msg
      )
    );
    setIsEditingTranscript(false);
  };

  const renderMessage = (message, index) => {
    if (message.type === 'transcript' && !showTranscript) {
      return null;
    }

    const isHighlighted = highlightedText && message.content.includes(highlightedText);

    return (
      <div
        key={index}
        className={`p-4 rounded-lg mb-4 ${
          message.type === 'user'
            ? 'bg-blue-700 ml-auto max-w-[80%] text-white shadow-md'
            : message.type === 'ai'
            ? 'bg-gray-800 mr-auto max-w-[80%] border border-gray-600 shadow-md text-white'
            : message.type === 'transcript'
            ? 'bg-neutral-700 w-full'
            : 'bg-red-600 text-white'
        }`}
      >
        {message.type === 'transcript' ? (
          isEditingTranscript ? (
            <div className="w-full">
              <textarea
                value={editedTranscript}
                onChange={(e) => setEditedTranscript(e.target.value)}
                className="w-full h-48 p-2 bg-neutral-800 text-white border border-neutral-600 rounded-md"
              />
              <div className="flex justify-end mt-2">
                <button 
                  onClick={saveEditedTranscript}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save
                </button>
                <button 
                  onClick={() => setIsEditingTranscript(false)}
                  className="px-3 py-1 ml-2 bg-neutral-600 text-white rounded-md hover:bg-neutral-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
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
          )
        ) : message.type === 'user' ? (
          <div>
            <div className="font-semibold mb-1 text-sm text-blue-200">You</div>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ) : message.type === 'ai' ? (
          <div>
            <div className="font-semibold mb-1 text-sm text-green-400">AI Assistant</div>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    );
  };

  // Add this useEffect to scroll to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[calc(100vh-200px)]">
      {/* Transcript controls */}
      <div className="bg-neutral-900 p-2 border-b border-neutral-800 flex items-center flex-shrink-0">
        <button 
          onClick={toggleTranscript}
          className="flex items-center gap-1 px-3 py-1 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 mr-2"
        >
          {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
        </button>
        <button 
          onClick={toggleEditTranscript}
          className="flex items-center gap-1 px-3 py-1 bg-neutral-800 text-white rounded-md hover:bg-neutral-700"
          disabled={isEditingTranscript}
        >
          <Edit className="w-4 h-4" />
          Edit Transcript
        </button>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0" ref={chatRef}>
        {messages.map((message, index) => renderMessage(message, index))}
        {loading && (
          <div className="flex items-center gap-2 text-neutral-400">
            <Loader className="w-4 h-4 animate-spin" />
            <span>AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 bg-neutral-900 border-t border-neutral-800 flex-shrink-0">
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
