import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IStatisticsResponse } from "../types/responseTypes";
const apiUrl = import.meta.env.VITE_API_URL;

export const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/logs` }),
    endpoints: (build) => ({
        getStatistics: build.query<IStatisticsResponse, { page?: string, perPage?: string }>({
            query: ({ page, perPage }) => ({
                url: '',
                params: { page, per_page: perPage }
            })
        }),
    }),
})

export const { useGetStatisticsQuery } = statisticsApi;
