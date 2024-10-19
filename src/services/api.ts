import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface Post {
    id: number
    name: string
}
type PostsResponse = Post[]

const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (build) => ({
        getPosts: build.query<PostsResponse, void>({
            query: () => 'posts',
            keepUnusedDataFor: 5,
        }),
    }),
})
