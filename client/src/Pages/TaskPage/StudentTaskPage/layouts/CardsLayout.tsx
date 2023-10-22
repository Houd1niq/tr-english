import React, { useEffect, useState } from "react";
import { StudentWordCard } from "../../../../components/StudentWordCard";
import { CommonButton } from "../../../../components/CommonButton";
import { userApiSlice } from "../../../../services/trEnglishApi/userApiSlice";
import { useLocation } from "react-router-dom";

export const CardsLayout: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const hashUrl = pathname[2];

  const { data: studentTaskData } =
    userApiSlice.useGetStudentTaskQuery(hashUrl);
  const { data: taskData } = userApiSlice.useGetOneTaskQuery(hashUrl);
  const [updateStudentTaskQuery] = userApiSlice.useUpdateStudentTaskMutation();
  const [cardIdx, setCardIdx] = useState(0);

  useEffect(() => {
    if (taskData && cardIdx === taskData.value.length) {
      updateStudentTaskQuery({ hash: hashUrl, cardsComplete: true });
    }
  }, [taskData, cardIdx]);

  if (
    studentTaskData &&
    taskData &&
    cardIdx < taskData.value.length &&
    !studentTaskData.cardsComplete
  ) {
    return (
      <div className="mb-10">
        {
          <StudentWordCard
            rusValue={taskData.value[cardIdx].rus}
            engValue={taskData.value[cardIdx].eng}
            idx={cardIdx}
            quantity={taskData.value.length}
            setCardIdx={setCardIdx}
          ></StudentWordCard>
        }
      </div>
    );
  } else if (
    taskData &&
    studentTaskData &&
    (cardIdx === taskData.value.length || studentTaskData.cardsComplete)
  ) {
    const quantity = taskData.value.length;
    return (
      <div className="mt-3 mb-10 text-lg">
        <h2 className="text-2xl">Поздравляем! Вы прошли все карточки.</h2>
        <div className="mt-4 mb-4 ">
          <h3>Ваши результаты</h3>
          <p className="text-green-300">Пройдено {`${quantity}/${quantity}`}</p>
        </div>
        <p>Хотите повторить карточки заново?</p>
        <CommonButton
          className="max-w-[320px] mt-1"
          onClick={() => {
            setCardIdx(0);
            updateStudentTaskQuery({ hash: hashUrl, cardsComplete: false });
          }}
        >
          Повторить карточки заново
        </CommonButton>
      </div>
    );
  }

  return <></>;
};
