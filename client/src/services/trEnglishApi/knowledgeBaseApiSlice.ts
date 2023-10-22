import { TrEnglishApi } from "./TREnglishApi";

export type KnowledgeBaseItem = {
  itemId: number;
  correctCounter: number;
  wrongCounter: number;
  engWord: string;
  rusWord: string;
};

type KnowledgeBase = {
  KnowledgeBaseItem: KnowledgeBaseItem[];
};

export const knowledgeBaseApiSlice = TrEnglishApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<KnowledgeBaseItem[], number>({
      query: (count) => ({
        url: `knowledge-base/tasks/${count}`,
        method: "GET",
      }),
      transformResponse: (response: KnowledgeBaseItem[]) => {
        // return shuffle<KnowledgeBaseItem[]>(response);
        return response;
      },
    }),

    check: build.mutation<void, { id: string; isRight: "correct" | "wrong" }>({
      query: (body) => ({
        url: "knowledge-base/check",
        method: "PUT",
        body: { ...body, id: Number(body.id) },
      }),
      invalidatesTags: ["KnowledgeBase"],
    }),

    addToKnowledgeBase: build.mutation<
      void,
      { rusWord: string; engWord: string }
    >({
      query: (body) => ({
        url: "knowledge-base/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["KnowledgeBase"],
    }),

    getKnowledgeBase: build.query<KnowledgeBaseItem[], void>({
      query: () => ({
        url: "knowledge-base/get",
        method: "GET",
      }),
      providesTags: ["KnowledgeBase", "User"],
      transformResponse: (response: KnowledgeBase) => {
        return [...response.KnowledgeBaseItem];
      },
    }),

    deleteKnowledgeBaseItem: build.mutation<void, number>({
      query: (itemId) => ({
        url: `knowledge-base/delete/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["KnowledgeBase"],
    }),
  }),
});
