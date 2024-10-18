import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Issue {
    id: number;
    number: number;
    title: string;
    body: string;
    state: string;
    comments: number;
}

interface IssuesState {
    issues: Issue[];
    loading: boolean;
    error: string | null;
}

const initialState: IssuesState = {
    issues: [],
    loading: false,
    error: null,
};

export const fetchIssues = createAsyncThunk(
    'issues/fetchIssues',
    async ({ owner, repo }: { owner: string; repo: string }) => {
        const response = await axios.get(`http://localhost:4000/issues?owner=${owner}&repo=${repo}`);
        return response.data as Issue[];
    }
);

const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchIssues.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchIssues.fulfilled, (state, action) => {
            state.loading = false;
            state.issues = action.payload;
        });
        builder.addCase(fetchIssues.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        });
    },
});

export default issuesSlice.reducer;