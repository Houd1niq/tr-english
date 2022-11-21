import React, { useCallback, useEffect, useState } from "react";
import WordsInput from "./WordsInput";
import { CardValue } from "../Pages/CreateTaskPage";

export const TeacherWordCard: React.FC<{
  idx: number;
  setArray: React.Dispatch<React.SetStateAction<CardValue[]>>;
}> = ({ idx, setArray }) => {
  const [eng, setEng] = useState("");
  const [rus, setRus] = useState("");
  useEffect(() => {
    setArray((prevState) => {
      prevState[idx] = { ...prevState[idx], rus, eng };
      return prevState;
    });
  }, [eng, rus]);

  return (
    <div className="card flex bg-cart-bg-dark p-5 mb-4 rounded-md items-center">
      <p className="text-main-white mr-4">{idx + 1}</p>
      <div className="mr-auto">
        <WordsInput
          name="eng"
          getValue={setEng}
          value={eng}
          label="Термин на английском"
        ></WordsInput>
      </div>
      <div>
        <WordsInput
          name="rus"
          getValue={setRus}
          value={rus}
          label="Определение на русском"
        ></WordsInput>
      </div>
      <button
        onClick={() => {
          console.log("here");
          setArray((prevState) => {
            prevState.splice(idx, 1);
            return [...prevState];
          });
        }}
        className="text-main-white ml-4"
      >
        X
      </button>
    </div>
  );
};
