import React from "react";
import styled from "styled-components";

const Loader2 = () => {
  return (
    <StyledWrapper>
      <div className="loader justify-center m-20">
        <div className="loader__circle" />
        <div className="loader__circle" />
        <div className="loader__circle" />
        <div className="loader__circle" />
        <div className="loader__circle" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    position: relative;
    display: flex;
    gap: 0.3em;
  }

  .loader::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2em;
    filter: blur(70px);
    background-color: #ff0000;
    background-image: radial-gradient(
        at 52% 57%,
        hsla(11, 83%, 72%, 1) 0px,
        transparent 20%
      ),
      radial-gradient(at 37% 57%, hsla(175, 78%, 66%, 1) 0px, transparent 50%);
  }

  .loader__circle {
    --size__loader: 0.6em;
    width: var(--size__loader);
    height: var(--size__loader);
    border-radius: 50%;
    animation: loader__circle__jumping 2s infinite;
    background-color: #ff1d00;
  }

  .loader__circle:nth-child(2n) {
    animation-delay: 300ms;
    background-color: #ff7373;
  }

  .loader__circle:nth-child(3n) {
    animation-delay: 600ms;
  }

  @keyframes loader__circle__jumping {
    0%,
    100% {
      transform: translateY(0px);
    }

    25% {
      transform: translateY(-15px) scale(0.5);
    }

    50% {
      transform: translateY(0px);
    }

    75% {
      transform: translateY(5px) scale(0.9);
    }
  }
`;

export default Loader2;
