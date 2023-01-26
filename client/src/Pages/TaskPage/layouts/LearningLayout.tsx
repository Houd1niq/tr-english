import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { CommonButton } from "../../../components/CommonButton";
import { userApiSlice } from "../../../services/trEnglishApi/userApiSlice";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../../../utils/notificationUtilities";
import { setLearningComplete } from "../../../store/slices/currentTaskSlice";

export const LearningLayout: React.FC = () => {
  const task = useAppSelector((state) => state.currentTaskReducer);
  const [counter, setCounterValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const dispatch = useAppDispatch();
  const [updateStudentTaskQuery] = userApiSlice.useUpdateStudentTaskMutation();
  const answerInput = useRef<HTMLInputElement>(null);

  function checkAnswer(idx: number, answer: string) {
    const defaultColor = answerInput.current!.style.backgroundColor;
    if (
      task!.value[idx].eng.trim().toLocaleLowerCase() ===
      answer.toLowerCase().trim()
    ) {
      triggerSuccessNotification("Верно", 1000);
      answerInput.current!.style.outlineColor = "#86efac";
      answerInput.current!.style.backgroundColor = "#b8f1cc";
      setCounterValue((prev) => prev + 1);
    } else {
      triggerWarningNotification("Неверно", 1000);
      answerInput.current!.style.outlineColor = "#ef4242";
      answerInput.current!.style.backgroundColor = "#ee7878";
    }
    setTimeout(() => {
      setCurrentIndex((prevState) => prevState + 1);
      answerInput.current!.style.outlineColor = "";
      answerInput.current!.style.backgroundColor = defaultColor;
      setAnswer("");
    }, 1500);
  }

  useLayoutEffect(() => {
    if (task) {
      setCounterValue(task.learnCorrectNumber);
    }
  }, [task]);

  useEffect(() => {
    if (task && currentIndex === task.value.length && !task.learningComplete) {
      dispatch(setLearningComplete({ complete: true, correctNumber: counter }));
      updateStudentTaskQuery({
        hash: task.hash,
        learningComplete: true,
        learnCorrectNumber: counter,
      });
    }
  }, [task, currentIndex]);

  if (task && currentIndex < task.value.length && !task.learningComplete) {
    return (
      <div className="mt-4 w-100% lg:w-[70vw] min-h-[300px] h-[70vh]">
        <div className="card w-full rounded-xl bg-cart-bg-dark p-4 h-full flex flex-col justify-between">
          <h3 className="text-xl">
            {currentIndex + 1}/{task.value.length}
          </h3>
          <p className="text-4xl text-center">{task.value[currentIndex].rus}</p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
            <label htmlFor="answer">Введите ваш ответ</label>
            <input
              ref={answerInput}
              className="bg-bg-input p-1 mt-1 outline-none focus:outline-main-purple rounded"
              placeholder="Введите ответ (язык: Английский)"
              type="text"
              name="answer"
              value={answer}
              autoComplete="off"
              onChange={(e) => setAnswer(e.target.value)}
            />
            <CommonButton
              onClick={() => {
                checkAnswer(currentIndex, answer);
              }}
              value="Овтетить"
              type="submit"
            ></CommonButton>
          </form>
        </div>
      </div>
    );
  } else if (
    task &&
    (currentIndex === task.value.length || task.learningComplete)
  ) {
    return (
      <div className="mt-3 mb-10 text-lg">
        <h2 className="text-2xl">Вы закончили учить все слова.</h2>
        <div className="mt-4 mb-4 ">
          <h3>Ваши результаты</h3>
          <p className="text-green-300">
            Вы правильно ответили на {`${counter}/${task.value.length}`}
          </p>
        </div>
        <p>Хотите пройти заново?</p>
        <CommonButton
          onClick={() => {
            setCurrentIndex(0);
            dispatch(
              setLearningComplete({ complete: false, correctNumber: 0 })
            );
            updateStudentTaskQuery({
              hash: task.hash,
              learningComplete: false,
              learnCorrectNumber: 0,
            });
          }}
          value="Повторить заново"
        ></CommonButton>
      </div>
    );
  }
  return <></>;
};
