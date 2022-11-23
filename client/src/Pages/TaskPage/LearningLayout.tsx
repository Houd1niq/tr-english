import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CommonButton } from "../../components/CommonButton";
import { setLearningComplete } from "../../store/slices/authSlice";
import { userApiSlice } from "../../services/userApiSlice";

export const LearningLayout: React.FC = () => {
  const task = useAppSelector((state) => state.authReducer.user!.currentTask);
  const [counter, setCounterValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const dispatch = useAppDispatch();
  const [updateStudentTaskQuery] = userApiSlice.useUpdateStudentTaskMutation();

  function checkAnswer(idx: number, answer: string) {
    if (task!.value[idx].eng.toLocaleLowerCase() === answer.toLowerCase()) {
      alert("Правильно");
      setCounterValue((prevState) => prevState + 1);
    }
    setCurrentIndex((prev) => prev + 1);
    setAnswer("");
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
      <div className="mt-4 ">
        <div className="card w-[60vw] rounded-xl bg-cart-bg-dark p-4 h-[60vh] flex flex-col justify-between">
          <h3 className="text-xl">
            {currentIndex + 1}/{task.value.length}
          </h3>
          <p className="text-4xl text-center">{task.value[currentIndex].rus}</p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
            <label htmlFor="answer">Введите ваш ответ</label>
            <input
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
