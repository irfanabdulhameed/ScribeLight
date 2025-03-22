// import React from "react";
// import Chatbox from "../Component/Chatbox";
// import BG from "../Component/BG";
// import Footer from "../Component/Footer";
// import { Loader } from "lucide-react";
// import Ytinput from "../Component/Ytinput";
// // import ChatBox2 from "../Component/ChatBox-2";
// // import Chatbox3 from "../Component/Chatbox-3";

// const Summarize = () => {
//   return (
//     <div>
//       <BG />
//       <Ytinput />
//       {/* <ChatBox2 /> */}
//       <Chatbox />
//       {/* <Chatbox3 /> */}
//       {/* <Loader /> */}
//       <Footer />
//     </div>
//   );
// };

// export default Summarize;


import React, { useState } from "react";
import Chatbox from "../Component/Chatbox";
import BG from "../Component/BG";
import Footer from "../Component/Footer";
import Ytinput from "../Component/Ytinput";

const Summarize = () => {
  const [transcript, setTranscript] = useState(""); // State to store the transcript

  // Callback function to receive the transcript from Ytinput
  const handleTranscriptReceived = (transcript) => {
    setTranscript(transcript);
  };

  return (
    <div>
      <BG />
      {/* Pass the callback function to Ytinput */}
      <Ytinput onTranscriptReceived={handleTranscriptReceived} />
      {/* Pass the transcript to Chatbox */}
      <Chatbox transcript={transcript} />
      <Footer />
    </div>
  );
};

export default Summarize;