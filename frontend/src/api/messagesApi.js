import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import ROUTES from '../utils/routes.js';

import { getItemStorage } from '../utils/authLocalStorage.js';

const baseUrl = `/api/v1${ROUTES.messages}`;

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const userId = getItemStorage();

      if (userId && userId.token) {
        headers.set('authorization', `Bearer ${userId.token}`);
      }

      return headers;
    },
  }),
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
