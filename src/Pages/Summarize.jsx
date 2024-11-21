import React, { useState } from "react";

function Summarize() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchFact = async () => {
    if (!input.trim()) return;

    // Add user input to the messages array
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/number-fact`, {
        method: "POST",
        headers: {
          "Content-Type": "Summarize/json",
        },
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
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchFact();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 h-96 overflow-y-auto flex flex-col gap-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[75%] ${
                message.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a number..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchFact}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summarize;
