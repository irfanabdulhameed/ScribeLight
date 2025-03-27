import React, { useState, useRef, useEffect } from 'react';
// Add Copy icon to imports
import { Loader, Eye, EyeOff, Edit, Copy, Check } from 'lucide-react';
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
  const [hasTranscript, setHasTranscript] = useState(false); // Add this state to track if transcript exists
  const chatRef = useRef(null);
  
  // Add state to track which message has been copied
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  
  // Add a new state to track if the initial heading should be shown
  const [showInitialHeading, setShowInitialHeading] = useState(true);
  
  useEffect(() => {
    if (transcript) {
      setMessages([{ type: 'transcript', content: transcript }, { type: 'ai', content: 'Transcript has been updated'}]);
      setEditedTranscript(transcript);
      setHasTranscript(true);
      // Hide the initial heading when transcript is available
      setShowInitialHeading(false);
    }
  }, [transcript]);

  // In the handleSubmit function, modify the streaming logic
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    
    // Create a temporary message for the AI response that will be updated
    const tempAiMessageId = Date.now();
    setMessages(prev => [...prev, { type: 'ai', id: tempAiMessageId, content: '' }]);
    
    setLoading(true);
    setInput('');
  
    try {
      // Make a fetch request to the streaming endpoint
      const response = await fetch('http://127.0.0.1:5000/api/process-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
          transcript: editedTranscript || transcript,
        }),
      });
  
      // Create a reader from the response body stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      // Read the stream
      let responseStarted = false;
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Decode the chunk and process it
        const chunk = decoder.decode(value, { stream: true });
        
        // Process the SSE data
        const lines = chunk.split('\n\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(line.substring(6));
              
              if (jsonData.chunk) {
                // If this is the first chunk, hide the loader
                if (!responseStarted) {
                  responseStarted = true;
                  setLoading(false);
                }
                
                // Update the AI message with the new chunk
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === tempAiMessageId 
                      ? { ...msg, content: msg.content + jsonData.chunk } 
                      : msg
                  )
                );
              }
              
              if (jsonData.done) {
                // Stream is complete
                break;
              }
              
              if (jsonData.error) {
                console.error('Error from server:', jsonData.error);
                // Update the AI message with the error
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === tempAiMessageId 
                      ? { ...msg, content: 'Error: ' + jsonData.error } 
                      : msg
                  )
                );
                break;
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Update the AI message with the error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempAiMessageId 
            ? { ...msg, content: 'Error: ' + error.message } 
            : msg
        )
      );
    } finally {
      // Ensure loading is set to false in all cases
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

  // Remove this duplicate declaration
  // const [copiedMessageId, setCopiedMessageId] = useState(null);
  
  // Keep the function
  const handleCopyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text).then(() => {
      // Set the copied message ID to show the check icon
      setCopiedMessageId(messageId);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const renderMessage = (message, index) => {
    if (message.type === 'transcript' && !showTranscript) {
      return null;
    }

    const isHighlighted = highlightedText && message.content.includes(highlightedText);
    const messageId = message.id || `message-${index}`;
    // Check if this is a completed AI message
    const isCompletedAiMessage = message.type === 'ai' && message.content;

    return (
      <div
        key={index}
        className={`p-4 mb-4 relative group ${
          message.type === 'user'
            ? 'bg-[#292929] ml-auto max-w-[80%] text-white text-sm rounded-2xl'
            : message.type === 'ai'
            ? 'bg-nuetral-900 mr-auto max-w-[80%] text-white text-sm  mb-10'
            : message.type === 'transcript'
            ? 'bg-neutral-700 w-full'
            : 'bg-red-600 text-white'
        }`}
      >
        {/* Copy button for AI responses - visible only on hover */}
        {isCompletedAiMessage && (
      
          <button
            onClick={() => handleCopyToClipboard(message.content, messageId)}
            className="absolute left-4 -bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 text-xs text-neutral-400 hover:text-white bg-neutral-800/70 p-2 rounded-md"
            title="Copy to clipboard"
          >
            {copiedMessageId === messageId ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        )}
        
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
      {/* Initial heading - shown only when no transcript is available */}

      
      {/* Main chat area - visible but with reduced opacity when initial heading is shown */}
      <div 
        className={`flex-1 min-h-[20vh] max-h-[70vh] overflow-y-auto p-4 min-h-0 scrollbar-thin scrollbar-thumb-neutral-500 ${showInitialHeading && !hasTranscript ? 'opacity-20' : 'opacity-100'}`} 
        ref={chatRef}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#272727 transparent'
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
      <div>
      {showInitialHeading && !hasTranscript && (
        <div className="flex flex-col items-center justify-center h-full ">
          <h2 className="text-6xl font-semibold text-center text-white font-space-grotesk">
            Everything is Cooked here!<br />
            Enter your Link
          </h2>
          <p className='text-white/50 pt-2 mb-10'>Use Scribe<span className='text-red-400/50'>Light</span> and en<span className='text-red-400/50'>Lighten</span> yourself</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4 bg-neutral-900  border-neutral-800 mt-auto">
        <div className="relative">
          {/* Only show transcript controls if transcript exists */}
          {hasTranscript && (
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
          )}
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={hasTranscript ? "Ask anything about the video..." : "Waiting for transcript..."}
            className="w-full px-4 py-3 h-24 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none resize-none pr-12 scrollbar-thin scrollbar-thumb-neutral-600 placeholder:text-neutral-500 placeholder:font-normal border-t-gray-500/50 border-l-gray-500/50 border-b-gray-800/50 border-r-gray-800/50 border"
            disabled={loading || !hasTranscript}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#171717 transparent'
            }}
          />
          <button
            type="submit"
            disabled={loading || !hasTranscript}
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
    </div>
  );
};

export default Chatbox;
