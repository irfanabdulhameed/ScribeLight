import React, { useState, useRef } from "react";
import Chatbox from "../Component/Chatbox";
import BG from "../Component/BG";
import Footer from "../Component/Footer";
import Ytinput from "../Component/Ytinput";
// import Minimap from "../Component/Minimap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Summarize = () => {
  const [transcript, setTranscript] = useState(""); // State to store the transcript
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control sidebar visibility
  const chatContainerRef = useRef(null);

  // Callback function to receive the transcript from Ytinput
  const handleTranscriptReceived = (transcript) => {
    setTranscript(transcript);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
    <div className="flex min-h-[calc(90vh-50px)] bg-neutral-900 overflow-hidden">
      {/* Sidebar with Ytinput */}
      <div 
        className={`bg-neutral-800 border-r border-neutral-600 transition-all duration-700 ease-in-out rounded-r-xl ${
          sidebarOpen ? 'w-[32rem]' : 'w-0'
        } overflow-hidden flex flex-col`}
      >
        <div className="p-4 flex-1 overflow-y-auto">
          <Ytinput onTranscriptReceived={handleTranscriptReceived} />
        </div>
      </div>

      {/* Toggle sidebar button */}
      <button 
        onClick={toggleSidebar}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-white p-1 rounded-r-md z-10 hover:bg-neutral-700 transition-colors"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto h-full">
            <Chatbox transcript={transcript} />
          </div>
        </div>
      </div>

      {/* Minimap */}
      {/* <Minimap 
        containerRef={chatContainerRef} 
        className="z-20" 
        style={{
          top: "calc(4rem + 8px)", // Position from top to align with "Show Transcript" button
          bottom: "calc(4rem + 8px)" // Position from bottom to end above prompt box
        }}
      /> */}
    </div></div>
  );
};

export default Summarize;