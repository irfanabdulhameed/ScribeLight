import React, { useEffect, useState } from "react";

const Minimap = ({ rootId }) => {
  const [mousedown, setMousedown] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById(rootId);
    if (!rootElement) return;
    rootElement.classList.add("relative", "w-full", "float-left");

    const minimapContainer = document.createElement("div");
    minimapContainer.className =
      "fixed right-1 top-0 border border-gray-300 w-[135px] h-[720px] overflow-hidden cursor-pointer p-2 bg-white shadow-md";
    document.body.appendChild(minimapContainer);

    const clonedNode = rootElement.cloneNode(true);
    clonedNode.className = "fixed cursor-pointer scale-50 origin-left transform";
    minimapContainer.appendChild(clonedNode);

    const miniregion = document.createElement("div");
    miniregion.className =
      "fixed bg-black opacity-20 border-2 border-gray-400 cursor-grab";
    document.body.appendChild(miniregion);

    const onMouseMove = (e) => {
      if (!mousedown) return;
      const scrollTop =
        (e.clientY - miniregion.offsetHeight / 2) /
        document.documentElement.clientHeight;
      window.scrollTo(0, scrollTop * document.documentElement.scrollHeight);
    };

    const onMouseDown = () => setMousedown(true);
    const onMouseUp = () => setMousedown(false);

    window.addEventListener("scroll", () => {
      const scrollRatio =
        window.scrollY / document.documentElement.scrollHeight;
      miniregion.style.top =
        scrollRatio * document.documentElement.clientHeight + "px";
    });

    miniregion.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      document.body.removeChild(minimapContainer);
      document.body.removeChild(miniregion);
    };
  }, [rootId, mousedown]);

  return null;
};

export default Minimap;
