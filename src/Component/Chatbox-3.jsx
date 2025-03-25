// import React, { useState, useEffect, useRef } from "react";
// // import { ArrowUpIcon, cloud, CloudOffIcon } from "@heroicons/react/24/solid";

// import { CiCloudOn } from "react-icons/ci";
// import { CiNoWaitingSign } from "react-icons/ci";
// import { FaArrowUp } from "react-icons/fa";

// function Chatbox3() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [useApi, setUseApi] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const generateDummyReply = () => {
//     const dummyReplies = [
//       "That's an interesting point!",
//       "I'm not sure about that. Can you tell me more?",
//       "That's a great question! Let me think...",
//       "I understand. Please go on.",
//       "That's fascinating! I'd love to learn more about it.",
//     ];
//     return dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
//   };

//   const fetchFact = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     if (useApi) {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/api/number-fact", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ number: input }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           const botMessage = { sender: "bot", text: data.fact };
//           setMessages((prev) => [...prev, botMessage]);
//         } else {
//           const errorMessage = {
//             sender: "bot",
//             text: data.error || "Something went wrong!",
//           };
//           setMessages((prev) => [...prev, errorMessage]);
//         }
//       } catch (error) {
//         const errorMessage = {
//           sender: "bot",
//           text: "An error occurred while fetching the fact.",
//         };
//         setMessages((prev) => [...prev, errorMessage]);
//       }
//     } else {
//       const dummyReply = generateDummyReply();
//       const botMessage = { sender: "bot", text: dummyReply };
//       setMessages((prev) => [...prev, botMessage]);
//     }

//     setIsLoading(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchFact();
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Number Fact Chatbot
//           </h1>
//         </div>
//       </header>
//       <main className="flex-grow overflow-hidden">
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <div className="bg-white shadow-sm rounded-lg h-full flex flex-col">
//             {/* API Toggle Button */}
//             <div className="flex justify-end p-4">
//               <button
//                 onClick={() => setUseApi(!useApi)}
//                 className="flex items-center px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
//               >
//                 {useApi ? (
//                   <>
//                     <CiCloudOn className="h-5 w-5 mr-2" />
//                     Using API
//                   </>
//                 ) : (
//                   <>
//                     <CiNoWaitingSign className="h-5 w-5 mr-2" />
//                     Using Dummy Replies
//                   </>
//                 )}
//               </button>
//             </div>
//             {/* Messages Display */}
//             <div className="flex-grow p-4 overflow-y-auto">
//               {messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`mb-4 ${
//                     message.sender === "user" ? "text-right" : "text-left"
//                   }`}
//                 >
//                   <span
//                     className={`inline-block px-4 py-2 rounded-lg ${
//                       message.sender === "user"
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     {message.text}
//                   </span>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//             {/* Input Form */}
//             <form onSubmit={handleSubmit} className="p-4 border-t">
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Type your message..."
//                   className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//                   disabled={isLoading}
//                 >
//                   <FaArrowUp className="h-5 w-5" />
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Chatbox3;
