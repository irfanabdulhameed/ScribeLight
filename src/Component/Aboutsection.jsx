import whatImg from "../assets/what.svg";
import doImg from "../assets/do.svg";
import aiImg from "../assets/ai.svg";

export default function Aboutpart() {
  return (
    <div className="min-h-screen text-white py-12 mb-40">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* First Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
          <div className="relative">
            <div className="relative z-10">
              <div className="absolute top-20 left-0 w-80 h-80 bg-red-500 opacity-15 rounded-full blur-3xl  "></div>
              <img
                src={whatImg} // Replace with actual image path
                alt="Curious person illustration"
                className="mx-auto w-[400px] h-[400px]"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              What does ScribeLight Do?
            </h2>
            <p className="text-gray-300">
              ScribeLight uploads YouTube content with summaries (AI). It
              transcribes videos (captions or Whisper AI) and uses OpenAI to
              generate quick key points or paragraph summaries, saving you time.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4">
              Can I summarize videos without having to watch them entirely?
            </h2>
            <p className="text-gray-300">
              Yes, ScribeLight can provide summaries of YouTube videos allowing
              you to quickly access the main points without having to watch the
              entire video.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src={doImg} // Replace with actual image path
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
              src={aiImg} // Replace with actual image path
              alt="Technology illustration"
              className="mx-auto w-[400px] h-[400px]"
            />
            <div className="absolute bottom-0 left-0 w-80 h-80   bg-red-600 opacity-15 rounded-full blur-3xl"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              What technology does ScribeLight use to transcribe YouTube videos?
            </h2>
            <p className="text-gray-300">
              ScribeLight tackles video transcription with a double act. It uses
              the YouTube Data API to grab captions when available, and Whisper
              AI to convert raw audio when needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
