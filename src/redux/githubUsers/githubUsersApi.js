import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      toast.error(
        `Ok:) Try again! Because there is nothing to search. ${err.message}`
      );
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const githubUsersApi = createApi({
  reducerPath: "githubUsers",
  baseQuery: axiosBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["GithubUsers"],
  refetchOnFocus: true,
  endpoints: (builder) => ({
    searchGithubUsers: builder.query({
      query: (query) => ({
        url: `search/users?${query}`,
        method: "get",
      }),
      transformResponse: (response) => ({
        partialUsers: response.items,
        totalPages: Math.floor(response.total_count / 30),
      }),
    }),
  }),
});

export const { useSearchGithubUsersQuery } = githubUsersApi;
