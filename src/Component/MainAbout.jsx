
import aboutUsImg from "../assets/Aboutus.svg";
import missionImg from "../assets/mission-2.svg";
import whoweare from "../assets/Whoweare-2.svg";

export default function AboutMain() {
  return (
    <div className="min-h-screen text-white py-12 mb-40">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* First Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
          <div className="relative">
            <div className="relative z-10">
              <div className="absolute top-20 left-0 w-80 h-80 bg-red-500 opacity-15 rounded-full blur-3xl  "></div>
              <img
                src={aboutUsImg} // Replace with actual image path
                alt="Curious person illustration"
                className="mx-auto w-[400px] h-[400px]"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              About Us?
            </h2>
            <p className="text-gray-300 font-normal">
              We're Scribelight, your chat-based companion for transforming
              YouTube videos into concise text summaries. Through natural
              conversation, we help you extract key information from hours of
              content, making it quick and easy to get to the heart of what
              matters most.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4">
              Mission
            </h2>
            <p className="text-gray-300">
            Our mission is to make video content more accessible by transforming 
            YouTube videos into quick, digestible summaries. We're committed to 
            saving your time while maximizing knowledge retention.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src={missionImg} // Replace with actual image path
                alt="Person using computer illustration"
                className="mx-auto w-[400px] h-[400px] relative z-10"
              />
              <div className="absolute -bottom-0 -right-0 w-80 h-80 bg-red-600 opacity-15 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Third Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img
              src={whoweare} // Replace with actual image path
              alt="Technology illustration"
              className="mx-auto w-[400px] h-[400px]"
            />
            <div className="absolute bottom-0 left-0 w-80 h-80   bg-red-600 opacity-15 rounded-full blur-3xl"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Who we are?
            </h2>
            <p className="text-gray-300">
            Who Are We? We’re five final-year students from Farook College,
              and ScribeLight is our college project. We’re pretty new to the
              whole tech scene, but we’re diving in with loads of curiosity and
              enthusiasm. This is our first big leap into the world of web
              development, and we’re excited to share it with you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
