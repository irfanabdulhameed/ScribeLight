// // import Navbar from "../Component/Navbar";
// import aboutUsImg from "../assets/Aboutus.svg";
// import missionImg from "../assets/mission-2.svg";
// // import BG from "../Component/BG";
// import Footer from "../Component/Footer";
// import whoweare from "../assets/Whoweare-2.svg";

// const About = () => {
//   return (
//     <div>
//       <div>
//         <div className="flex flex-col  mx-10 py-10">
//           {/* <div className="fixed inset-0 bg-red-700 bg-[size:5px_5px] opacity-20 blur-[200px] -z-10"></div> */}
//           <div className="text-center text-white lg:text-6xl md:text-4xl text-2xl font-semibold pt-10 lg:pb-5 pb-1">
//             About <span className="text-red-400">Us</span>
//           </div>
//           <div className=" lg:px-40 px-4 text-justify lg:text-center md:text-center text-sm md:text-md lg:text-xl text-white">
//             <p className="text-neutral-300">
//               Hey there! 👋 We’re Scribelight, your go-to tool for turning those
//               long YouTube videos into easy-to-digest text and summaries. We
//               know that not everyone has time to watch hours of content, and
//               that’s why we’re here to help you get straight to the good stuff.
//             </p>

//             <img src={aboutUsImg} className="w-3/5 mx-auto" />
//           </div>
//           <div className="text-center text-white lg:text-6xl md:text-4xl text-2xl font-semibold pt-24 lg:pb-5 pb-1 mt-24 border-t border-neutral-500">
//             Our <span className="text-red-400">Mission</span>
//           </div>
//           <div className=" lg:px-40 px-4 text-justify lg:text-center md:text-center text-sm md:text-md lg:text-xl text-white">
//             <p className="text-neutral-300">
//               We know you don’t have time to jump from tool to tool just to get
//               the information you need. That’s why we created an all-in-one
//               solution that’s super easy to use, even if you’re not a tech
//               wizard. So, why not give ScribeLight a try? We’re here to help you
//               save time and get the most out of your YouTube viewing experience.
//               Dive in, and let’s lighten up that content together!
//             </p>
//             <img src={missionImg} className="w-3/5 mt-14 mx-auto" />
//           </div>
//           <div className="text-center text-white lg:text-6xl md:text-4xl text-2xl font-semibold pt-24 lg:pb-5 pb-1 mt-24 border-t border-neutral-500">
//             Who <span className="text-red-400">We</span>
//             <span> Are?</span>
//           </div>
//           <div className=" lg:px-40 px-4 text-justify lg:text-center md:text-center text-sm md:text-md lg:text-xl text-white">
//             <p className="text-neutral-300">
//               Who Are We? We’re five final-year students from Farook College,
//               and ScribeLight is our passion project. We’re pretty new to the
//               whole tech scene, but we’re diving in with loads of curiosity and
//               enthusiasm. This is our first big leap into the world of web
//               development, and we’re excited to share it with you!
//             </p>
//             <img src={whoweare} className="w-3/5 mx-auto mt-14 pb-10" />
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default About;
import React from "react";
import aboutUsImg from "../assets/Aboutus.svg";
import missionImg from "../assets/mission-2.svg";
import BG from "../Component/BG"; // Importing your BG component
import Footer from "../Component/Footer";
import whoweare from "../assets/Whoweare-2.svg";

const About = () => {
  return (
    <div className="relative">
      {/* Background Component */}
      <BG />

      {/* Page Content */}
      <div className="relative z-10">
        {" "}
        {/* Added relative positioning with z-index to keep content above background */}
        <div className="flex flex-col mx-10 py-10">
          <div className="text-center text-white lg:text-6xl md:text-4xl text-2xl font-semibold pt-10 lg:pb-5 pb-1">
            About <span className="text-red-400">Us</span>
          </div>
          <div className="lg:px-40 px-4 text-justify lg:text-center md:text-center text-sm md:text-md lg:text-xl text-white">
            <p className="text-neutral-300">
              Hey there! 👋 We’re Scribelight, your go-to tool for turning those
              long YouTube videos into easy-to-digest text and summaries. We
              know that not everyone has time to watch hours of content, and
              that’s why we’re here to help you get straight to the good stuff.
            </p>
            <img src={aboutUsImg} className="w-3/5 mx-auto" />
          </div>
          <div className="text-center text-white lg:text-6xl md:text-4xl text-2xl font-semibold pt-24 lg:pb-5 pb-1 mt-24 border-t border-neutral-500">
            Our <span className="text-red-400">Mission</span>
          </div>
          <div className="lg:px-40 px-4 text-justify lg:text-center md:text-center text-sm md:text-md lg:text-xl text-white">
            <p className="text-neutral-300">
              We know you don’t have time to jump from tool to tool just to get
              the information you need. That’s why we created an all-in-one
              solution that’s super easy to use, even if you’re not a tech
              wizard. So, why not give ScribeLight a try? We’re here to help you
              save time and get the most out of your YouTube viewing experience.
              Dive in, and let’s lighten up that content together!
            </p>
            <img src={missionImg} className="w-3/5 mt-14 mx-auto" />
          </div>
          <div className="text-center text-white lg:text-6xl md:text-4xl text-2xl font-semibold pt-24 lg:pb-5 pb-1 mt-24 border-t border-neutral-500">
            Who <span className="text-red-400">We</span>
            <span> Are?</span>
          </div>
          <div className="lg:px-40 px-4 text-justify lg:text-center md:text-center text-sm md:text-md lg:text-xl text-white">
            <p className="text-neutral-300">
              Who Are We? We’re five final-year students from Farook College,
              and ScribeLight is our passion project. We’re pretty new to the
              whole tech scene, but we’re diving in with loads of curiosity and
              enthusiasm. This is our first big leap into the world of web
              development, and we’re excited to share it with you!
            </p>
            <img src={whoweare} className="w-3/5 mx-auto mt-14 pb-10" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
  