import { createApi } from '@reduxjs/toolkit/query/react';

import axiosApi from './axiosApi.js';

import ROUTES from '../utils/routes.js';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: () => axiosApi(ROUTES.channels),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
