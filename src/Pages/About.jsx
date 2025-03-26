
import React from "react";
import aboutUsImg from "../assets/Aboutus.svg";
import missionImg from "../assets/mission-2.svg";
import BG from "../Component/BG";
import Footer from "../Component/Footer";
import whoweare from "../assets/Whoweare-2.svg";
import AboutMain from "../Component/MainAbout";

const About = () => {
  return (
    <div className="bg-neutral-900 min-h-screen relative">
      {/* Background Component */}
      <BG className="fixed inset-0 w-full h-full -z-10" />

      {/* Page Content */}
      <div className="relative z-10">
        <AboutMain />
        <Footer />
      </div>
    </div>
  );
};

export default About;
