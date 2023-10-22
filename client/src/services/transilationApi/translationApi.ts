import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dictionary.yandex.net/api/v1/dicservice.json",
});

const API_KEY: string =
  "dict.1.1.20221126T105728Z.94371fc2397178e6.dec2f5bbb7e6829272ab297c9ece6f51af6cb3b3";

export const translationApi = createApi({
  reducerPath: "translationApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTranslation: builder.query<
      {
        def: {
          text: string;
          tr: { text: string; syn: { text: string }[] }[];
        }[];
      },
      string
    >({
      query: (word) => ({
        url: `lookup?key=${API_KEY}&lang=en-ru&text=${word}`,
        method: "GET",
      }),
    }),
  }),
});
