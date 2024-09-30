// import Navbar from "../Component/Navbar";
import aboutUsImg from "../assets/Aboutus.svg";

const About = () => {
  return (
    <div className="flex flex-col  mx-10 py-10">
      {/* <div className="fixed inset-0 bg-red-700 bg-[size:5px_5px] opacity-20 blur-[200px] -z-10"></div> */}
      <div className="text-center text-white lg:text-6xl md:text-4xl text-2xl font-semibold pt-10 lg:pb-5 pb-1">
        About <span className="text-red-400">Us</span>
      </div>
      <div className=" lg:px-40 px-4 text-justify lg:text-center md:text-center text-sm md:text-lg lg:text-2xl text-white">
        <p>
          Hey there! 👋 We’re Scribelight, your go-to tool for turning those
          long YouTube videos into easy-to-digest text and summaries. We know
          that not everyone has time to watch hours of content, and that’s why
          we’re here to help you get straight to the good stuff.
        </p>
        <img src={aboutUsImg} />
      </div>
    </div>
  );
};

export default About;
