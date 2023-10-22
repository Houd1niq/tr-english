import React, { useCallback, useEffect, useState } from "react";
import WordsInput from "../../../../components/WordsInput";
import { translationApi } from "../../../../services/transilationApi/translationApi";
import {
  debounce,
  firstLetterToUppercase,
} from "../../../../utils/utilsFunction";
import { CommonButton } from "../../../../components/CommonButton";
import { knowledgeBaseApiSlice } from "../../../../services/trEnglishApi/knowledgeBaseApiSlice";
import { triggerSuccessNotification } from "../../../../utils/notificationUtilities";

export const KnowledgeBaseAddLayout: React.FC = () => {
  const [getTranslation, translationResponse] =
    translationApi.useLazyGetTranslationQuery();
  const [addWord, addWordResponse] =
    knowledgeBaseApiSlice.useAddToKnowledgeBaseMutation();

  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const [eng, setEng] = useState("");
  const [rus, setRus] = useState("");

  const debouncedGetTranslation = useCallback(
    debounce(getTranslation, 300),
    []
  );

  useEffect(() => {
    if (addWordResponse.isSuccess) {
      triggerSuccessNotification("Слово успешно добавлено", 1000);
    }
  }, [addWordResponse.isSuccess]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addWord({ engWord: eng, rusWord: rus });
    setEng("");
    setRus("");
    setIsSuggestionsOpen(false);
  };

  useEffect(() => {
    if (translationResponse.data) setIsSuggestionsOpen(true);
  }, [translationResponse.data]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-center">Добавить слово</h1>
      </div>
      <div className="mt-5">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-row justify-between gap-4 items-center"
        >
          <WordsInput
            getValue={setEng}
            onChangeExtender={(value) => {
              value.length > 1 && debouncedGetTranslation(value);
            }}
            label={"Слово на английском"}
            name={"eng"}
            value={eng}
          />
          <div>
            <WordsInput
              label={"Слово на русском"}
              name={"rus"}
              getValue={setRus}
              value={rus}
            />
            {translationResponse.isSuccess && isSuggestionsOpen && (
              <ul className="flex gap-2">
                {translationResponse.currentData?.def.map((item) => {
                  return (
                    <li
                      className="text-main-white cursor-pointer hover:text-main-purple"
                      key={item.tr[0].text}
                      onClick={() => {
                        setRus(firstLetterToUppercase(item.tr[0].text));
                        setIsSuggestionsOpen(false);
                      }}
                    >
                      <CommonButton type="button">
                        {firstLetterToUppercase(item.tr[0].text)}
                      </CommonButton>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <CommonButton type="submit">Добавить</CommonButton>
        </form>
      </div>
    </div>
  );
};
