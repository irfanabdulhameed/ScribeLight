import React from "react";

const BG = () => {
  return (
    <div>
      <div className="absolute h-auto w-full bg-black">
        <div className="fixed inset-52 bg-red-700 bg-[size:5px_5px] opacity-20 blur-[200px]"></div>
      </div>
    </div>
  );
};

export default BG;
