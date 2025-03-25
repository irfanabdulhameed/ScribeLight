import React from 'react';

const AiLoader = () => {
  return (
    <div className="flex flex-row gap-1">
      <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" />
      <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]" />
      <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]" />
    </div>
  );
}

export default AiLoader;
