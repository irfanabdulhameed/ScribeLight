import React, { useState, useEffect, useRef } from "react";

function Chatbox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);

  const fetchFact = async () => {
    if (!input.trim()) return;

    // Add user input to the messages array
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/number-fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: input }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the bot response to the messages array
        setMessages((prev) => [...prev, { sender: "bot", text: data.fact }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.error || "Something went wrong!" },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred while fetching the fact." },
      ]);
    }

    setInput(""); // Clear the input field
    adjustTextareaHeight(); // Reset the height of the textarea
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline on Enter key without Shift
      fetchFact();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const maxHeight =
        3 * parseFloat(getComputedStyle(textareaRef.current).lineHeight); // Maximum 3 lines
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]); // Adjust height when input changes

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen mb-10">
        {/* Chat Box */}
        <div className="w-[calc(100%-50px)] max-h-screen border-2 border-gray-300 rounded-xl shadow-md p-4 ">
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
              placeholder="Ask a number..."
              rows="1"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none overflow-hidden"
              style={{ minHeight: "1.5rem" }} // Set a minimum height
            ></textarea>
            <button
              onClick={fetchFact}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated Bubble Message Component
function AnimatedBubbleMessage({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10); // Trigger animation
    return () => clearTimeout(timeout); // Cleanup
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
}

export default Chatbox;

// import React, { useState, useEffect, useRef } from "react";
// import Minimap from "../Misc/Minimap";

// function Chatbox() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const textareaRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const fetchFact = async () => {
//     if (!input.trim()) return;

//     setMessages((prev) => [...prev, { sender: "user", text: input }]);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/number-fact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ number: input }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessages((prev) => [...prev, { sender: "bot", text: data.fact }]);
//       } else {
//         setMessages((prev) => [
//           ...prev,
//           { sender: "bot", text: data.error || "Something went wrong!" },
//         ]);
//       }
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "An error occurred while fetching the fact." },
//       ]);
//     }

//     setInput("");
//     adjustTextareaHeight();
//     scrollToBottom();
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       fetchFact();
//     }
//   };

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

//   const scrollToBottom = () => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [input]);

//   const messagesContent = messages
//     .map(
//       (message) => (message.sender === "user" ? "U: " : "B: ") + message.text
//     )
//     .join("\n");

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-[90%] max-w-4xl border border-gray-300 rounded-xl shadow-md bg-white flex flex-col">
//         {/* Chat Messages Area */}
//         <div className="flex-grow overflow-hidden">
//           <div
//             ref={chatContainerRef}
//             className="h-[60vh] overflow-y-auto flex flex-col gap-4 p-4"
//           >
//             {messages.map((message, index) => (
//               <AnimatedBubbleMessage key={index} message={message} />
//             ))}
//           </div>
//         </div>

//         {/* Minimap */}
//         <div className="h-[15vh] border-t border-gray-200 p-2 overflow-hidden bg-gray-50">
//           {/* <Minimap
//             content={messagesContent}
//             selection={null} // Optional: Define visible area here
//             visibleLines={{
//               start: Math.floor(
//                 (chatContainerRef.current?.scrollTop || 0) / 20
//               ),
//               end: Math.ceil(
//                 ((chatContainerRef.current?.scrollTop || 0) +
//                   (chatContainerRef.current?.clientHeight || 1)) /
//                   20
//               ),
//             }}
//           /> */}
//         </div>

//         {/* Input Field */}
//         <div className="p-4 border-t border-gray-300">
//           <div className="flex items-center">
//             <textarea
//               ref={textareaRef}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask a number..."
//               rows="1"
//               className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none overflow-hidden"
//               style={{ minHeight: "1.5rem" }}
//             ></textarea>
//             <button
//               onClick={fetchFact}
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
//           : "self-start bg-gray-200 text-black rounded-bl-3xl rounded-br-3xl rounded-tr-3xl"
//       } p-3`}
//     >
//       {message.text}
//     </div>
//   );
// }

// export default Chatbox;
