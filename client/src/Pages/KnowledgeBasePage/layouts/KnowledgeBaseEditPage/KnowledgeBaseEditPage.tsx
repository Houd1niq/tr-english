import React, { useEffect } from "react";
import { KnowledgeBaseAddLayout } from "./KnowledgeBaseAddLayout";
import { knowledgeBaseApiSlice } from "../../../../services/trEnglishApi/knowledgeBaseApiSlice";
import TrashIcon from "../../../../assets/images/trash.svg";
import { triggerSuccessNotification } from "../../../../utils/notificationUtilities";

export const KnowledgeBaseEditPage: React.FC = () => {
  const { data: knowledgeBase, isSuccess: knowledgeBaseIsSuccess } =
    knowledgeBaseApiSlice.useGetKnowledgeBaseQuery();
  const [deleteTrigger, deleteResponse] =
    knowledgeBaseApiSlice.useDeleteKnowledgeBaseItemMutation();

  const deleteHandler = (id: number) => {
    deleteTrigger(id);
  };

  useEffect(() => {
    if (deleteResponse.isSuccess) {
      triggerSuccessNotification("Слово удалено", 1000);
    }
  }, [deleteResponse.isSuccess]);

  return (
    <div>
      <KnowledgeBaseAddLayout />
      <h2 className="text-2xl mt-5 mb-5">Список слов</h2>
      {knowledgeBaseIsSuccess && knowledgeBase && (
        <ul className="flex flex-col gap-2">
          <li className="flex flex-row justify-between items-center bg-cart-bg-dark py-3 px-5 rounded-md">
            <div className="w-[33%] text-center">Английское слово</div>
            <div className="w-[33%] text-center">Русское слово</div>
            <div className="w-[33%] text-center">Верно/Неверно</div>
          </li>
          {knowledgeBase.map((item) => (
            <li
              key={item.itemId}
              className="flex flex-row justify-between items-center bg-cart-bg-dark py-3 px-5 rounded-md"
            >
              <div className="w-[33%] text-center">{item.engWord}</div>
              <div className="w-[33%] text-center">{item.rusWord}</div>
              <div className="flex w-[33%] justify-center">
                <div className="">
                  <span className="text-green-500">{item.correctCounter}</span>/
                  <span className="text-red-500">{item.wrongCounter}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  deleteHandler(item.itemId);
                }}
              >
                <img src={TrashIcon} alt="delete" className="w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
