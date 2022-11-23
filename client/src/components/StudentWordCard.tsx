import React, { useRef } from "react";

export const StudentWordCard: React.FC<{
  rusValue: string;
  engValue: string;
  idx: number;
  quantity: number;
  setCardIdx: React.Dispatch<React.SetStateAction<number>>;
}> = ({ rusValue, engValue, idx, quantity, setCardIdx }) => {
  const rus = useRef<HTMLDivElement>(null);
  const eng = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const prevButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (idx !== 0) {
          setCardIdx((prev) => prev - 1);
          if (container.current) {
            container.current.classList.add("animate-cardPrev");
            setTimeout(() => {
              if (container.current)
                container.current.classList.remove("animate-cardPrev");
            }, 200);
          }
        }
      }}
      className="bg-bg-input w-[50%] h-full border-r border-cart-bg-dark hover:bg-light-gray"
    >
      {"<"}
    </button>
  );

  const nextButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setCardIdx((prev) => prev + 1);
        if (container.current) {
          container.current.classList.add("animate-cardNext");
          setTimeout(() => {
            if (container.current)
              container.current.classList.remove("animate-cardNext");
          }, 200);
        }
      }}
      className="bg-bg-input w-[50%] h-full hover:bg-light-gray"
    >
      {">"}
    </button>
  );

  return (
    <div
      ref={container}
      className="card-container cursor-pointer inline-block"
      onClick={() => {
        if (rus.current && eng.current) {
          rus.current.classList.toggle("flip-rus");
          eng.current.classList.toggle("flip-eng");
        }
      }}
    >
      <div
        ref={rus}
        className="card-rus w-[60vw] flex flex-col rounded-xl h-[60vh] bg-cart-bg-dark p-3"
      >
        <h4 className="text-center text-xl ">
          {idx + 1}/{quantity}
        </h4>
        <div className="text-[62px] flex-grow flex items-center justify-center">
          {engValue}
        </div>
        <nav className="h-10">
          {prevButton}
          {nextButton}
        </nav>
      </div>

      <div
        ref={eng}
        className="card-eng w-[60vw] flex flex-col rounded-xl h-[60vh] bg-cart-bg-dark p-3"
      >
        <h4 className="text-center text-xl ">
          {idx + 1}/{quantity}
        </h4>
        <div className="text-[62px] flex-grow flex items-center justify-center">
          {rusValue}
        </div>
        <nav className="h-10">
          {prevButton}
          {nextButton}
        </nav>
      </div>
    </div>
  );
};
