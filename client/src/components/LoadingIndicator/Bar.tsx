import React from "react";

const Bar: React.FC<{ animationDuration: number; progress: number }> = ({
  animationDuration,
  progress,
}) => (
  <div
    className="bg-main-purple h-0.5 left-0 fixed top-0 w-full z-20"
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transition: `margin-left ${animationDuration}ms linear`,
    }}
  >
    <div
      className="block w-full opacity-100 absolute r-0 h-full"
      style={{
        transform: "rotate(3deg) translate(0px, -4px)",
      }}
    ></div>
  </div>
);

export default Bar;
