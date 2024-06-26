import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelData: null,
  countCurrentMessages: null,
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelData = action.payload;
    },
    setCountCurrentMessages: (state, action) => {
      state.countCurrentMessages = action.payload;
    },
  },
});

export const { setCurrentChannel, setCountCurrentMessages } =
  currentChannelSlice.actions;

export default currentChannelSlice.reducer;
