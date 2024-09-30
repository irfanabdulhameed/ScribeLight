import React from "react";

const BG = () => {
  return (
    <div>
      <div className="fixed h-full w-full bg-neutral-900">
        <div className="absolute inset-0 bg-red-700 bg-[size:5px_5px] opacity-20 blur-[200px]"></div>
      </div>
    </div>
  );
};

export default BG;
