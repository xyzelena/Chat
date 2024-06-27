import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelData: {},
  countCurrentMessages: 0,
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const currentChannelData = { ...action.payload };
      return { ...state, currentChannelData };
    },
    setCountCurrentMessages: (state, action) => {
      const countCurrentMessages = action.payload;
      return { ...state, countCurrentMessages };
    },
  },
});

export const { setCurrentChannel, setCountCurrentMessages } =
  currentChannelSlice.actions;

export default currentChannelSlice.reducer;
