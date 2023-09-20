import React from "react";

const LoadingContainer: React.FC<{
  animationDuration: number;
  children: React.ReactNode;
  isFinished: boolean;
}> = ({ animationDuration, children, isFinished }) => (
  <div
    style={{
      opacity: isFinished ? 0 : 1,
      pointerEvents: "none",
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    {children}
  </div>
);

export default LoadingContainer;
