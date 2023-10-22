import React, { useState } from "react";
import { knowledgeBaseApiSlice } from "../../../../../services/trEnglishApi/knowledgeBaseApiSlice";
import { StudentWordCard } from "../../../../../components/StudentWordCard";
import { CommonButton } from "../../../../../components/CommonButton";

export const KBCards: React.FC = () => {
  const { data: tasks, refetch } = knowledgeBaseApiSlice.useGetTasksQuery(15);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      {tasks && currentIndex < tasks.length && (
        <StudentWordCard
          rusValue={tasks[currentIndex].rusWord}
          engValue={tasks[currentIndex].engWord}
          idx={currentIndex}
          quantity={tasks.length}
          setCardIdx={setCurrentIndex}
        />
      )}

      {tasks && currentIndex === tasks.length && (
        <>
          <div>
            Вы повтори часть вашей базы знаний. Можем позаниматься ещё, если
            есть желание :)
          </div>
          <CommonButton
            className="mt-3"
            onClick={() => {
              setCurrentIndex(0);
              refetch();
            }}
          >
            Учить ещё!
          </CommonButton>
        </>
      )}
    </div>
  );
};
