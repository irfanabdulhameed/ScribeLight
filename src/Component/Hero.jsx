// import { Button } from "@/components/ui/button";
import Summarizebtn from "./summarize-btn";
import ytLogo from "../assets/ytlogo.png";
import paperImg from "../assets/paper.png";
import lineImg from "../assets/line.png";

export default function HeroSection() {
  return (
    <section
      className="relative w-full py-16 md:py-24 lg:py-32 xl:py-48 bg-center bg-contain bg-no-repeat mb-20 md:mb-40"
      style={{
        backgroundImage: 'url("../src/assets/grid.png")',
        backgroundSize: "100% 100%",
      }}
    >
      <div className="absolute top-20 md:top-40 left-0 md:left-14 w-60 md:w-80 h-60 md:h-80 sm:hide">
        <img src={ytLogo} className="floating w-full hidden md:block"></img>
      </div>{" "}
      <div className="absolute top-20 md:top-40 right-0 md:right-20 w-60 md:w-80 h-60 md:h-80">
        <img src={paperImg} className="floatingg w-full hidden md:block"></img>
      </div>
      <div className="absolute inset-0" />
      <div className="relative container mx-auto px-4 md:px-6 flex items-center justify-center min-h-full">
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl xl:text-6xl/none text-center font-space-grotesk">
              <span className="bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">
                Skip The Watch!{""}
              </span>
              <span
                className="px-2 md:p-6 font-bold bg-gradient-to-b from-red-400 to-red-600 text-transparent bg-clip-text"
                style={{
                  textShadow: "0 0 15px rgba(255, 62, 62, 0.3)",
                }}
              >
                Summarize
              </span>
              <br className="md:block" />
              <span className="bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">
                Youtube Videos in Seconds.
              </span>
            </h1>
            <p className="max-w-[600px] text-white text-sm md:text-base lg:text-lg mx-auto font-light text-center ">
              Discover how our innovative idea can transform your work and boost
              your productivity.
            </p>
          </div>
          <div className="flex justify-center w-full">
            <Summarizebtn />
          </div>
        </div>
      </div>
    </section>
  );
}
