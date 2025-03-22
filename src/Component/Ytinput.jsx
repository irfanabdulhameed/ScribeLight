// import React, { useState } from "react";
// import Loader2 from "../Misc/Loading-2"; // Import your custom loader

// const Ytinput = () => {
//   const [youtubeLink, setYoutubeLink] = useState("");
//   const [videoId, setVideoId] = useState("");
//   const [loading, setLoading] = useState(false); // Track loading state

//   const handleInputChange = (e) => {
//     setYoutubeLink(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when fetching starts
//     const videoId = extractVideoId(youtubeLink);
//     if (videoId) {
//       // Simulate fetching time (remove this in real use)
//       setTimeout(() => {
//         setVideoId(videoId);
//         setLoading(false); // Set loading to false when done
//       }, 2000);
//     } else {
//       setLoading(false); // Stop loading if input is invalid
//       alert("Please enter a valid YouTube link");
//     }
//   };

//   const extractVideoId = (url) => {
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-full max-w-md  sm:px-6 lg:px-8">
//         <p className="mt-3 max-w-md mx-auto text-white text-center sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//           Enter a YouTube link to summarize and chat!
//         </p>
//         <form onSubmit={handleSubmit} className="mt-8 mb-10 space-y-1">
//           <div className="rounded-md shadow-sm">
//             <div>
//               <input
//                 type="text"
//                 value={youtubeLink}
//                 onChange={handleInputChange}
//                 placeholder="Enter YouTube link"
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm text-center"
//               />
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               disabled={loading} // Disable button while loading
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-b-md text-white ${
//                 loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
//             >
//               {loading ? "Loading..." : "Load Video"}
//             </button>
//           </div>
//         </form>
//         {/* <Loader2 /> */}
//         {loading ? (
//           <Loader2 /> // Show the loader during loading
//         ) : (
//           videoId && (
//             <div className="mt-8 mb-5 aspect-w-16 aspect-h-9">
//               <iframe
//                 src={`https://www.youtube.com/embed/${videoId}`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-52 rounded-lg shadow-lg"
//               ></iframe>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ytinput;

//

//

//
//

//
//
//
//
//
//
//
//
////
//
//
//
//
//
//
//
//part 2
//
//
//
//
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//
//
//
// import React, { useState } from "react";
// import Loader2 from "../Misc/Loading-2";

// const Ytinput = () => {
//   const [youtubeLink, setYoutubeLink] = useState("");
//   const [videoId, setVideoId] = useState("");
//   const [transcript, setTranscript] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     setYoutubeLink(e.target.value);
//     setError(""); // Clear error when input changes
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const videoId = extractVideoId(youtubeLink);
//       if (!videoId) {
//         throw new Error("Invalid YouTube URL");
//       }

//       // Send to Flask backend
//       const response = await fetch("http://localhost:5000/transcribe", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ video_id: videoId }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Transcription failed");
//       }

//       const data = await response.json();
//       setVideoId(videoId);
//       setTranscript(data.transcript);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const extractVideoId = (url) => {
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-full max-w-md sm:px-6 lg:px-8">
//         <p className="mt-3 max-w-md mx-auto text-white text-center sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//           Enter a YouTube link to summarize and chat!
//         </p>
//         <form onSubmit={handleSubmit} className="mt-8 mb-10 space-y-1">
//           <div className="rounded-md shadow-sm">
//             <div>
//               <input
//                 type="text"
//                 value={youtubeLink}
//                 onChange={handleInputChange}
//                 placeholder="Enter YouTube link"
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm text-center"
//               />
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-b-md text-white ${
//                 loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
//             >
//               {loading ? "Loading..." : "Load Video"}
//             </button>
//           </div>
//         </form>

//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}

//         {loading ? (
//           <Loader2 />
//         ) : (
//           videoId && (
//             <div className="mt-8">
//               <div className="mb-5 aspect-w-16 aspect-h-9">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${videoId}`}
//                   title="YouTube video player"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="w-full h-64 rounded-lg shadow-lg"
//                 ></iframe>
//               </div>
//               {transcript && (
//                 <div className="mt-4 p-4 bg-white rounded-lg shadow">
//                   <h3 className="text-lg font-semibold mb-2">Transcript</h3>
//                   <p className="text-gray-700 whitespace-pre-wrap">
//                     {transcript}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ytinput;

//
//
//
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//part 3
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//
//
////
//
//
//
//
//

// import React, { useState } from "react";
// import Loader2 from "../Misc/Loading-2"; // Import your custom loader
// import { YouTubeTranscript } from "youtube-transcript"; // Import the library

// const Ytinput = ({ onTranscript }) => {
//   // Add onTranscript prop
//   const [youtubeLink, setYoutubeLink] = useState("");
//   const [videoId, setVideoId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [transcribing, setTranscribing] = useState(false); // Track transcribing state

//   const handleInputChange = (e) => {
//     setYoutubeLink(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when fetching starts
//     const videoId = extractVideoId(youtubeLink);
//     if (videoId) {
//       // Simulate fetching time (remove this in real use)
//       setTimeout(() => {
//         setVideoId(videoId);
//         setLoading(false); // Set loading to false when done
//       }, 2000);
//     } else {
//       setLoading(false); // Stop loading if input is invalid
//       alert("Please enter a valid YouTube link");
//     }
//   };

//   const handleTranscribe = async () => {
//     if (!videoId) {
//       alert("Please load a video first.");
//       return;
//     }

//     setTranscribing(true); // Start transcribing
//     try {
//       // Fetch transcript using youtube-transcript
//       const transcriptResponse = await YouTubeTranscript.fetchTranscript(
//         videoId
//       );
//       const transcriptText = transcriptResponse
//         .map((entry) => entry.text)
//         .join(" ");

//       // Pass transcript to parent component
//       onTranscript(transcriptText);
//     } catch (error) {
//       console.error("Error fetching transcript:", error);
//       alert("Failed to fetch transcript. Please try another video.");
//     } finally {
//       setTranscribing(false); // Stop transcribing
//     }
//   };

//   const extractVideoId = (url) => {
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-full max-w-md sm:px-6 lg:px-8">
//         <p className="mt-3 max-w-md mx-auto text-white text-center sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//           Enter a YouTube link to summarize and chat!
//         </p>
//         <form onSubmit={handleSubmit} className="mt-8 mb-4 space-y-1">
//           <div className="rounded-md shadow-sm">
//             <div>
//               <input
//                 type="text"
//                 value={youtubeLink}
//                 onChange={handleInputChange}
//                 placeholder="Enter YouTube link"
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm text-center"
//               />
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               disabled={loading} // Disable button while loading
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-b-md text-white ${
//                 loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
//             >
//               {loading ? "Loading..." : "Load Video"}
//             </button>
//           </div>
//         </form>

//         {/* Transcribe Button */}
//         <div className="mt-4">
//           <button
//             onClick={handleTranscribe}
//             disabled={!videoId || transcribing} // Disable if no video is loaded or transcribing
//             className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
//               transcribing ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
//             } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//           >
//             {transcribing ? "Transcribing..." : "Transcribe Video"}
//           </button>
//         </div>

//         {/* Video Embed */}
//         {loading ? (
//           <Loader2 /> // Show the loader during loading
//         ) : (
//           videoId && (
//             <div className="mt-8 mb-5 aspect-w-16 aspect-h-9">
//               <iframe
//                 src={`https://www.youtube.com/embed/${videoId}`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-12 rounded-lg shadow-lg"
//               ></iframe>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ytinput;

import React, { useState } from "react";
import Loader2 from "../Misc/Loading-2"; // Import your custom loader

const Ytinput = ({ onTranscriptReceived }) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track errors

  const handleInputChange = (e) => {
    setYoutubeLink(e.target.value);
    setError(""); // Clear error when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when fetching starts
    setError(""); // Clear any previous errors

    const videoId = extractVideoId(youtubeLink);
    if (!videoId) {
      setLoading(false);
      setError("Please enter a valid YouTube link");
      return;
    }

    try {
      // Send the video ID to the Flask backend for transcription
      const response = await fetch("http://localhost:5000/api/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_id: videoId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to transcribe video");
      }

      const data = await response.json();
      setVideoId(videoId); // Set the video ID for embedding
      onTranscriptReceived(data.transcript); // Pass the transcript to the parent component
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md sm:px-6 lg:px-8">
        <p className="mt-3 max-w-md mx-auto text-white text-center sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Enter a YouTube link to summarize and chat!
        </p>
        <form onSubmit={handleSubmit} className="mt-8 mb-10 space-y-1">
          <div className="rounded-md shadow-sm">
            <div>
              <input
                type="text"
                value={youtubeLink}
                onChange={handleInputChange}
                placeholder="Enter YouTube link"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm text-center"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-b-md text-white ${
                loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              {loading ? "Loading..." : "Load Video"}
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Loader or video embed */}
        {loading ? (
          <Loader2 /> // Show the loader during loading
        ) : (
          videoId && (
            <div className="mt-8 mb-5 aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-52 rounded-lg shadow-lg"
              ></iframe>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ytinput;
