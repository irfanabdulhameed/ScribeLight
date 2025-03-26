import React, { useState, useRef, useEffect } from 'react';
import { Loader, Eye, EyeOff, Edit } from 'lucide-react';
import AiLoader from '../Misc/AI-Loader';
import ReactMarkdown from 'react-markdown';

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
        className={`p-4  mb-4 ${
          message.type === 'user'
            ? 'bg-[#292929] ml-auto max-w-[80%] text-white text-sm rounded-2xl'
            : message.type === 'ai'
            ? 'bg-nuetral-900 mr-auto max-w-[80%]  text-white text-sm'
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
                className="w-full h-48 p-2 bg-neutral-800 text-white text-sm border border-neutral-600 rounded-md"
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
            <div className="font-semibold text-sm text-nuetral-900"></div>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ) : message.type === 'ai' ? (
          <div>
            <div className="font-semibold text-[10px] text-red-400 opacity-80">ScribeLight</div>
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
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
    <div className="flex flex-col h-full">
      {/* Transcript controls */}
      {/* Main chat area */}
      <div 
        className="flex-1 min-h-[40vh] max-h-[70vh] overflow-y-auto p-4 min-h-0 scrollbar-thin scrollbar-thumb-neutral-500" 
        ref={chatRef}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 transparent'
        }}
      >
        {messages.map((message, index) => renderMessage(message, index))}
        {loading && (
          <div className="flex items-center gap-2 text-neutral-400 w-1/5">
            <AiLoader />
          </div>
        )}
      </div>

      {/* Input form - now positioned at the bottom */}
      <form onSubmit={handleSubmit} className="p-4 bg-neutral-900 border-t border-neutral-800 mt-auto">
        <div className="relative">
          <div className="flex gap-2 mb-4">
            <button 
              onClick={toggleTranscript}
              className="flex items-center gap-1 px-4 py-2 bg-neutral-800 text-xs text-white rounded-xl hover:bg-neutral-700 transition-colors transition duration-300 border-t-gray-500/50 border-l-gray-500/50 border-b-gray-800/50 border-r-gray-800/50 border"
            >
              {showTranscript ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
            </button>
            <button 
              onClick={toggleEditTranscript}
              className="flex items-center gap-1 px-4 py-2 bg-neutral-800 text-white rounded-xl text-xs hover:bg-neutral-700 transition-colors transition duration-300 border-t-gray-500/50 border-l-gray-500/50 border-b-gray-800/50 border-r-gray-800/50 border"
              disabled={isEditingTranscript}
            >
              <Edit className="w-3 h-3" />
              Edit Transcript
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask anything about the video..."
            className="w-full px-4 py-3 h-24 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none resize-none pr-12 scrollbar-thin scrollbar-thumb-neutral-600 placeholder:text-neutral-500 placeholder:font-normal border-t-gray-500/50 border-l-gray-500/50 border-b-gray-800/50 border-r-gray-800/50 border"
            disabled={loading}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 transparent'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute bottom-2 right-2 p-2 mb-3 mr-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed border-t-red-300 border-l-red-300 border-b-red-700 border-r-red-700 border transition-colors transition duration-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
