import React from "react";
import Chatbox from "../Component/Chatbox";
import BG from "../Component/BG";
import Footer from "../Component/Footer";
import { Loader } from "lucide-react";
import Ytinput from "../Component/Ytinput";
// import ChatBox2 from "../Component/ChatBox-2";
import Chatbox3 from "../Component/Chatbox-3";

const Summarize = () => {
  return (
    <div>
      <BG />
      <Ytinput />
      {/* <ChatBox2 /> */}
      <Chatbox />
      {/* <Chatbox3 /> */}
      {/* <Loader /> */}
      <Footer />
    </div>
  );
};

export default Summarize;
