import React, { useState } from "react";
import Loader2 from "../Misc/Loading-2"; // Import your custom loader

const Ytinput = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleInputChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when fetching starts
    const videoId = extractVideoId(youtubeLink);
    if (videoId) {
      // Simulate fetching time (remove this in real use)
      setTimeout(() => {
        setVideoId(videoId);
        setLoading(false); // Set loading to false when done
      }, 2000);
    } else {
      setLoading(false); // Stop loading if input is invalid
      alert("Please enter a valid YouTube link");
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
      <div className="w-full max-w-md  sm:px-6 lg:px-8">
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
        {/* <Loader2 /> */}
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
                className="w-full h-12 rounded-lg shadow-lg"
              ></iframe>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ytinput;
