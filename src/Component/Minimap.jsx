import React, { useState, useEffect, useRef } from "react";
import "./Minimap.css";

const Minimap = ({ containerRef }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [contentClone, setContentClone] = useState(null);
  const minimapRef = useRef(null);

  useEffect(() => {
    if (!containerRef?.current) return;
    
    const container = containerRef.current;
    
    // Clone the content for minimap display
    const updateClone = () => {
      const clone = container.cloneNode(true);
      clone.style.transform = "scale(0.55)"; // Increased from 0.45 to 0.55
      clone.style.transformOrigin = "top left";
      clone.style.width = "200%"; // Decreased from 250% to 200% to match the new scale
      clone.style.height = "auto";
      clone.style.pointerEvents = "none";
      clone.style.position = "absolute";
      clone.style.top = "0";
      clone.style.left = "0";
      
      // Remove any large images or videos to improve performance
      clone.querySelectorAll('img, video').forEach(el => {
        el.remove();
      });
      
      // Remove prompt box from minimap
      clone.querySelectorAll('.prompt-box, .input-area, form').forEach(el => {
        el.remove();
      });
      
      // Remove transcript buttons
      clone.querySelectorAll('button[data-transcript], .transcript-button, .edit-transcript-button, .show-transcript-button').forEach(el => {
        el.remove();
      });
      
      setContentClone(clone);
    };
    
    // Update clone when content changes
    const observer = new MutationObserver(updateClone);
    observer.observe(container, { 
      childList: true, 
      subtree: true,
      characterData: true
    });
    
    // Initial clone
    updateClone();
    
    const handleScroll = () => {
      const scrollPercentage = container.scrollTop / (container.scrollHeight - container.clientHeight);
      setScrollPosition(scrollPercentage);
    };

    container.addEventListener("scroll", handleScroll);
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [containerRef]);

  const handleMinimapClick = (e) => {
    if (!containerRef?.current || !minimapRef.current) return;
    
    const container = containerRef.current;
    const clickPosition = e.nativeEvent.offsetY / minimapRef.current.clientHeight;
    const scrollTarget = clickPosition * (container.scrollHeight - container.clientHeight);
    
    container.scrollTo({
      top: scrollTarget,
      behavior: "smooth"
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Immediately scroll to the clicked position
    if (containerRef?.current && minimapRef.current) {
      const container = containerRef.current;
      const dragPosition = e.nativeEvent.offsetY / minimapRef.current.clientHeight;
      const scrollTarget = dragPosition * (container.scrollHeight - container.clientHeight);
      
      container.scrollTo({
        top: scrollTarget
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && containerRef?.current && minimapRef.current) {
      const container = containerRef.current;
      const dragPosition = e.nativeEvent.offsetY / minimapRef.current.clientHeight;
      const scrollTarget = dragPosition * (container.scrollHeight - container.clientHeight);
      
      container.scrollTo({
        top: scrollTarget
      });
    }
  };

  return (
    <div className="fixed right-0 top-16 bottom-16 w-32 bg-neutral-900 border-l border-neutral-700 z-10 overflow-hidden">
      <div
        ref={minimapRef}
        className="w-full h-full cursor-pointer relative"
        onClick={handleMinimapClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {/* Content clone container */}
        <div className="w-full h-full overflow-hidden">
          {contentClone && (
            <div 
              className="minimap-content opacity-70" 
              dangerouslySetInnerHTML={{ __html: contentClone.outerHTML }}
            />
          )}
        </div>
      </div>
      
      {/* Slider indicator */}
      <div
        className="absolute right-0 w-full bg-neutral-700 opacity-30 transition-all duration-100 ease-in-out"
        style={{
          top: `${scrollPosition * 100}%`,
          height: containerRef?.current ? 
            `${(containerRef.current.clientHeight / containerRef.current.scrollHeight) * 100}%` : '10%'
        }}
      ></div>
    </div>
  );
};

export default Minimap;