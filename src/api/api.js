// import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath: 'server/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test-job.pixli.app/send.php'
    }),
    endpoints: build => ({
        postUser: build.mutation({
            query: (abg) => ({
                url: ``,
                method: 'POST',
                body: abg,
            })
        })
    })
})

export const {usePostUserMutation} = api