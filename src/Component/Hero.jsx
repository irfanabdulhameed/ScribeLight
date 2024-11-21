// import { Button } from "@/components/ui/button";
import Summarizebtn from "./summarize-btn";
import ytLogo from "../assets/ytlogo.png";
import paperImg from "../assets/paper.png";

export default function HeroSection() {
  return (
    <section
      className=" relative w-full lg:py-32 xl:py-48 bg-center bg-contain bg-no-repeat mb-40"
      style={{
        backgroundImage: 'url("../src/assets/grid.png")',
        backgroundSize: "100% 100%",
      }}
    >
      <div className="absolute top-40 left-20 w-80 h-80 ">
        <img src={ytLogo} className="floating w-80 hidden lg:block"></img>
      </div>{" "}
      <div className="absolute top-40 right-20 w-80 h-80 ">
        <img src={paperImg} className="floatingg  w-80 hidden lg:block"></img>
      </div>
      <div className="absolute inset-0" />
      <div className="relative container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-xl sm:mt-20 md:text-5xl xl:text-6xl/none">
              Skip the watch!{""}
              <span
                className="text-red-500 p-6"
                style={{
                  textShadow: "0 0 50px rgba(255, 62, 62, 0.8)",
                }}
              >
                Summarize
              </span>
              <br></br> Youtube videos in seconds.
            </h1>
            <p className="max-w-[500px] text-zinc-200 text-sm lg:text-xl mx-auto font-light">
              Discover how our innovative idea can transform your work and boost
              your productivity.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Summarizebtn />
          </div>
        </div>
      </div>
    </section>
  );
}
