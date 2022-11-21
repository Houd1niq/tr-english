import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { StudentWordCard } from "../../components/StudentWordCard";
import { CommonButton } from "../../components/CommonButton";
import { setCardsComplete } from "../../store/slices/authSlice";

export const CardsLayout: React.FC = () => {
  const task = useAppSelector((state) => state.authReducer.user!.currentTask);
  const [cardIdx, setCardIdx] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (task && cardIdx === task.value.length && !task.cardsComplete) {
      dispatch(setCardsComplete(true));
    }
  }, [task, cardIdx]);

  if (task && cardIdx < task.value.length && !task.cardsComplete) {
    return (
      <div className="mt-8 mb-10">
        {
          <StudentWordCard
            rusValue={task.value[cardIdx].rus}
            engValue={task.value[cardIdx].eng}
            idx={cardIdx}
            quantity={task.value.length}
            setCardIdx={setCardIdx}
          ></StudentWordCard>
        }
      </div>
    );
  } else if (task && (cardIdx === task.value.length || task.cardsComplete)) {
    const quantity = task.value.length;
    return (
      <div className="mt-3 mb-10 text-lg">
        <h2 className="text-2xl">Поздравляем! Вы прошли все карточки.</h2>
        <div className="mt-4 mb-4 ">
          <h3>Ваши результаты</h3>
          <p className="text-green-300">Пройдено {`${quantity}/${quantity}`}</p>
        </div>
        <p>Хотите повторить карточки заново?</p>
        <CommonButton
          onClick={() => {
            setCardIdx(0);
            dispatch(setCardsComplete(false));
          }}
          value="Повторить карточки заново"
        ></CommonButton>
      </div>
    );
  }

  return <></>;
};
