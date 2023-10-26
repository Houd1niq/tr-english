import React, { useCallback, useEffect, useState } from "react";
import WordsInput from "./WordsInput";
import { CardValue } from "../Pages/CreateTaskPage";
import { translationApi } from "../services/transilationApi/translationApi";
import { debounce, firstLetterToUppercase } from "../utils/utilsFunction";

export const TeacherWordCard: React.FC<{
  idx: number;
  setArray: React.Dispatch<React.SetStateAction<CardValue[]>>;
}> = ({ idx, setArray }) => {
  const [eng, setEng] = useState("");
  const [rus, setRus] = useState("");
  const [arrayOfTranslations, setArrayOfTranslations] = useState<string[]>([]);

  const [getTranslation, translationResponse] =
    translationApi.useLazyGetTranslationQuery();

  const debouncedGetTranslation = useCallback(
    debounce(getTranslation, 1000),
    []
  );

  function onChangeEngHandler(word: string) {
    debouncedGetTranslation(word);
  }

  useEffect(() => {
    setArray((prevState) => {
      prevState[idx] = { ...prevState[idx], rus, eng };
      return prevState;
    });
  }, [eng, rus]);

  useEffect(() => {
    if (translationResponse.isSuccess && translationResponse.currentData) {
      let allTranslations: string[] = [];
      translationResponse.currentData.def.forEach((item) => {
        const [tr] = item.tr;
        allTranslations.push(tr.text);
        if (tr.syn) {
          tr.syn.forEach((item) => {
            allTranslations.push(item.text);
          });
        }
      });
      const numOfShowedWords: number =
        allTranslations.length < 3 ? allTranslations.length : 3;
      const showedTranslation = allTranslations.splice(0, numOfShowedWords);
      setArrayOfTranslations(showedTranslation);
    } else {
      setArrayOfTranslations([]);
    }
  }, [translationResponse]);

  return (
    <div className="card flex flex-col sm:flex-row bg-cart-bg-dark p-5 mb-4 rounded-md sm:items-center">
      <p className="text-main-white mr-4">{idx + 1}</p>
      <div className="sm:mr-auto">
        <WordsInput
          name="eng"
          getValue={setEng}
          onChangeExtender={onChangeEngHandler}
          value={eng}
          label="Термин на английском"
        ></WordsInput>
      </div>
      <div className="">
        <WordsInput
          name="rus"
          getValue={setRus}
          value={rus}
          label="Определение на русском"
        ></WordsInput>
        <ul className="flex flex-col mt-2 md:flex-row sm:mt-0 text-sm gap-2">
          {arrayOfTranslations.length > 0 &&
            arrayOfTranslations.map((word) => {
              return (
                <li
                  onClick={() => {
                    setRus(firstLetterToUppercase(word));
                    setArrayOfTranslations([]);
                  }}
                  className="transition-all px-2 py-1 bg-bg-input rounded cursor-pointer hover:bg-light-gray outline-none border-secondary-purple border-[1.5px]"
                  key={word}
                >
                  {firstLetterToUppercase(word)}
                </li>
              );
            })}
        </ul>
      </div>
      <button
        onClick={() => {
          console.log("here");
          setArray((prevState) => {
            prevState.splice(idx, 1);
            return [...prevState];
          });
        }}
        className="ml-4 text-red-400 mt-3 sm:mt-0"
      >
        X
      </button>
    </div>
  );
};
