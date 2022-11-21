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
  const button = useRef<HTMLButtonElement>(null);

  function nextCard(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setCardIdx((prev) => prev + 1);
  }
  function prevCard(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (idx !== 0) setCardIdx((prev) => prev - 1);
  }

  return (
    <div
      className="card-container cursor-pointer"
      onClick={(e) => {
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
          <button
            ref={button}
            onClick={prevCard}
            className="bg-bg-input w-[50%] h-full border-r border-cart-bg-dark"
          >
            {"<"}
          </button>
          <button
            onClick={nextCard}
            ref={button}
            className="bg-bg-input w-[50%] h-full"
          >
            {">"}
          </button>
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
          <button
            ref={button}
            className="bg-bg-input w-[50%] h-full border-r border-cart-bg-dark"
          >
            {"<"}
          </button>
          <button ref={button} className="bg-bg-input w-[50%] h-full">
            {">"}
          </button>
        </nav>
      </div>
    </div>
  );
};
