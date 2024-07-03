import { createSlice } from '@reduxjs/toolkit';

import { getItemStorage } from '../utils/authLocalStorage.js';

const initialState = getItemStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default authSlice.reducer;
