// import React, { useState, useEffect, useRef } from "react";

// function Chatbox({ transcript }) {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const textareaRef = useRef(null);

//   // Automatically add transcript to chat when it becomes available
//   useEffect(() => {
//     if (transcript) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: `**Video Transcript**:\n${transcript}`,
//         },
//       ]);
//     }
//   }, [transcript]);

//   const fetchGeminiResponse = async () => {
//     if (!input.trim()) return;

//     // Add user message
//     setMessages((prev) => [...prev, { sender: "user", text: input }]);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/process-text", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           text: input,
//           transcript: transcript,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "bot", text: data.processed_text },
//         ]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "bot", text: data.error || "Error" },
//         ]);
//       }
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Connection error" },
//       ]);
//     }

//     setInput("");
//     adjustTextareaHeight();
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault(); // Prevent newline
//       fetchGeminiResponse(); // Trigger API call
//     }
//   };

//   // Adjust textarea height dynamically
//   const adjustTextareaHeight = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       const maxHeight =
//         3 * parseFloat(getComputedStyle(textareaRef.current).lineHeight);
//       textareaRef.current.style.height = `${Math.min(
//         textareaRef.current.scrollHeight,
//         maxHeight
//       )}px`;
//     }
//   };

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [input]);

//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen mb-10">
//         <div className="w-[calc(100%-50px)] max-h-screen border-2 border-gray-300 rounded-xl shadow-md p-4">
//           <div className="h-[80vh] overflow-y-auto flex flex-col gap-4 p-2">
//             {messages.map((message, index) => (
//               <AnimatedBubbleMessage key={index} message={message} />
//             ))}
//           </div>

//           {/* Input area */}
//           <div className="mt-4 flex items-center">
//             <textarea
//               ref={textareaRef}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me anything..."
//               rows="1"
//               className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none overflow-hidden"
//               style={{ minHeight: "1.5rem" }}
//             ></textarea>
//             <button
//               onClick={fetchGeminiResponse}
//               className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Bubble Message Component
// function AnimatedBubbleMessage({ message }) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => setVisible(true), 10);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div
//       className={`relative max-w-[75%] transition-transform duration-300 break-words ${
//         visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//       } ${
//         message.sender === "user"
//           ? "self-end bg-red-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
//           : "self-start bg-white text-black rounded-bl-3xl rounded-br-3xl rounded-tr-3xl"
//       } p-3`}
//     >
//       {message.text}
//       {/* Bubble Tail */}
//       <div
//         className={`absolute w-0 h-0 border-t-[10px] border-b-[10px] ${
//           message.sender === "user"
//             ? "border-l-[10px] border-red-500 border-t-transparent border-b-transparent right-0 top-1/2 -translate-y-1/2"
//             : "border-r-[10px] border-white border-t-transparent border-b-transparent left-0 top-1/2 -translate-y-1/2"
//         }`}
//       ></div>
//     </div>
//   );
// }

// export default Chatbox;

import React, { useState, useEffect, useRef } from "react";

const Chatbox = ({ transcript }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);

  // Automatically add the transcript to the chat when it's available
  useEffect(() => {
    if (transcript) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `**Video Transcript**:\n${transcript}`,
        },
      ]);
    }
  }, [transcript]);

  // Send user input to the backend and get a response
  const fetchResponse = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("http://localhost:5000/api/process-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          transcript: transcript,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add bot response to the chat
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.processed_text },
        ]);
      } else {
        // Handle errors
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.error || "Something went wrong!" },
        ]);
      }
    } catch (err) {
      // Handle network errors
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred. Please try again." },
      ]);
    }

    // Clear the input field
    setInput("");
    adjustTextareaHeight();
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      fetchResponse();
    }
  };

  // Adjust textarea height dynamically
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight =
        3 * parseFloat(getComputedStyle(textareaRef.current).lineHeight);
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen mb-10">
        <div className="w-[calc(100%-50px)] max-h-screen border-2 border-gray-300 rounded-xl shadow-md p-4">
          {/* Messages Area */}
          <div className="h-[80vh] overflow-y-auto flex flex-col gap-4 p-2">
            {messages.map((message, index) => (
              <AnimatedBubbleMessage key={index} message={message} />
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-4 flex items-center">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              rows="1"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none overflow-hidden"
              style={{ minHeight: "1.5rem" }}
            ></textarea>
            <button
              onClick={fetchResponse}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Bubble Message Component
const AnimatedBubbleMessage = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`relative max-w-[75%] transition-transform duration-300 break-words ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${
        message.sender === "user"
          ? "self-end bg-red-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
          : "self-start bg-white text-black rounded-bl-3xl rounded-br-3xl rounded-tr-3xl"
      } p-3`}
    >
      {message.text}
      {/* Bubble Tail */}
      <div
        className={`absolute w-0 h-0 border-t-[10px] border-b-[10px] ${
          message.sender === "user"
            ? "border-l-[10px] border-red-500 border-t-transparent border-b-transparent right-0 top-1/2 -translate-y-1/2"
            : "border-r-[10px] border-white border-t-transparent border-b-transparent left-0 top-1/2 -translate-y-1/2"
        }`}
      ></div>
    </div>
  );
};

export default Chatbox;
