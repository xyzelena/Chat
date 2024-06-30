import { createApi } from '@reduxjs/toolkit/query/react';

import axiosApi from './axiosApi.js';

import ROUTES from '../utils/routes.js';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: () => axiosApi(ROUTES.messages),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        method: 'POST',
        body: newMessage,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
