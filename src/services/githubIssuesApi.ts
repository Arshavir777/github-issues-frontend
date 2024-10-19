import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IIssuesResponse } from "../types/responseTypes";
import { IGithubIssue } from "../types/githubIssueTypes";
const apiUrl = import.meta.env.VITE_API_URL;

export const githubIssuesApi = createApi({
    reducerPath: 'githubIssuesApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/github/issues` }),
    endpoints: (build) => ({
        getIssues: build.query<IIssuesResponse, { username: string, repo: string, page?: number, perPage?: number }>({
            query: ({ username, repo, page, perPage }) => ({
                url: `${username}/${repo}`,
                params: { page, per_page: perPage }
            })
        }),
        getIssue: build.query<IGithubIssue, { username: string, repo: string, issueNumber: number }>({
            query: ({ username, repo, issueNumber }) => `${username}/${repo}/${issueNumber}`,
        }),
    }),
})

export const { useLazyGetIssuesQuery, useGetIssueQuery } = githubIssuesApi;
