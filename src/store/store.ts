import { configureStore } from '@reduxjs/toolkit';
import { githubIssuesApi } from '../services/githubIssuesApi';
import { statisticsApi } from '../services/statisticsApi';

export const store = configureStore({
    reducer: {
        [githubIssuesApi.reducerPath]: githubIssuesApi.reducer,
        [statisticsApi.reducerPath]: statisticsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(githubIssuesApi.middleware)
            .concat(statisticsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
