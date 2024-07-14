import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  type: '',
  extraData: {
    currentModalChannelId: 0,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalVisibility: (state, action) => ({
      ...state,
      isVisible: action.payload.isVisible,
      type: action.payload.type,
      extraData: action.payload.extraData,
    }),
    resetModalState: () => initialState,
  },
});

export const { setModalVisibility, resetModalState } = modalsSlice.actions;

export default modalsSlice.reducer;

//   dispatch(setModalVisibility
// ({ isVisible: true, type: 'removeChannel', extraData: { currentModalChannelId: channel.id } }));
