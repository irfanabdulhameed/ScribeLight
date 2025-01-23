import React, { useState, useEffect, useRef } from "react";

const Minimap = ({ content, selection, visibleLines }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const minimapRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setScrollPosition(scrollPercentage * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMinimapClick = (e) => {
    const clickPosition =
      e.nativeEvent.offsetY / minimapRef.current.offsetHeight;
    scrollToPosition(clickPosition);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dragPosition =
        e.nativeEvent.offsetY / minimapRef.current.offsetHeight;
      scrollToPosition(dragPosition);
    }
  };

  const scrollToPosition = (position) => {
    const scrollTarget =
      position * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-0 top-0 w-32 h-full bg-gray-800 overflow-hidden text-[4px] leading-[4px] select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={minimapRef}
        className="w-full h-full cursor-pointer"
        onClick={handleMinimapClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {(content || "").split("\n").map((line, index) => (
          <div
            key={index}
            className={`text-gray-400 truncate px-1 ${
              selection && index >= selection.start && index <= selection.end
                ? "bg-blue-500 bg-opacity-50"
                : ""
            } ${
              isHovering &&
              visibleLines &&
              index >= visibleLines.start &&
              index <= visibleLines.end
                ? "bg-gray-600 bg-opacity-50"
                : ""
            }`}
          >
            {line}
          </div>
        ))}
      </div>
      <div
        ref={sliderRef}
        className="absolute right-0 w-1 bg-gray-400 opacity-50 transition-all duration-100 ease-in-out"
        style={{
          top: `${scrollPosition}%`,
          height: `${
            (window.innerHeight / document.documentElement.scrollHeight) * 100
          }%`,
        }}
      ></div>
    </div>
  );
};

export default Minimap;
