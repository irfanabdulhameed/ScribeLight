"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Paperclip,
  Volume2,
  Send,
  Check,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  const fetchFact = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/number-fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: input }),
      });

      const data = await response.json();

      if (response.ok) {
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

    setInput("");
    adjustTextareaHeight();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      fetchFact();
    }
  };

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "The message has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Failed to copy",
        description: "An error occurred while copying the message.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#343541] text-gray-100 flex flex-col">
      {/* Top button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          className="text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          what is this
        </Button>
      </div>

      {/* Chat content */}
      <div
        ref={chatContainerRef}
        className="flex-1 max-w-3xl mx-auto w-full p-4 overflow-auto"
      >
        {messages.map((message, index) => (
          <AnimatedBubbleMessage
            key={index}
            message={message}
            onCopy={() => copyToClipboard(message.text)}
          />
        ))}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-700 p-4">
        <div className="max-w-3xl mx-auto relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message ChatGPT"
            className="w-full bg-[#40414f] border-0 focus-visible:ring-0 resize-none pr-20 text-gray-100 placeholder:text-gray-400"
            style={{ minHeight: "1.5rem" }}
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-100 hover:bg-transparent"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              onClick={fetchFact}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-100 hover:bg-transparent"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedBubbleMessage({ message, onCopy }) {
  const [visible, setVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleCopy = () => {
    onCopy();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {message.sender === "bot" && (
        <Avatar className="h-8 w-8 mr-2">
          <img src="/placeholder.svg?height=30&width=30" alt="ChatGPT" />
        </Avatar>
      )}
      <div className="flex flex-col">
        <div
          className={`relative max-w-[75%] transition-all duration-300 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } ${
            message.sender === "user"
              ? "bg-[#5c5e6c] rounded-bl-xl rounded-tl-xl rounded-br-xl"
              : "bg-[#444654] rounded-bl-xl rounded-br-xl rounded-tr-xl"
          } p-3`}
        >
          {message.text}
        </div>
        {message.sender === "bot" && (
          <Button
            variant="ghost"
            size="sm"
            className="self-end mt-2 text-gray-400 hover:text-gray-100 hover:bg-transparent"
            onClick={handleCopy}
            aria-label={isCopied ? "Copied" : "Copy message"}
          >
            {isCopied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {isCopied ? "Copied" : "Copy"}
          </Button>
        )}
      </div>
      {message.sender === "user" && (
        <Avatar className="h-8 w-8 ml-2">
          <img src="/placeholder.svg?height=30&width=30" alt="User" />
        </Avatar>
      )}
    </div>
  );
}
