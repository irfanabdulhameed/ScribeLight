import React from "react";
import Chatbox from "../Component/Chatbox";
import BG from "../Component/BG";
import Footer from "../Component/Footer";
import { Loader } from "lucide-react";
import Ytinput from "../Component/Ytinput";

const Summarize = () => {
  return (
    <div>
      <BG />
      <Ytinput />
      <Chatbox />
      <Loader />
      <Footer />
    </div>
  );
};

export default Summarize;
