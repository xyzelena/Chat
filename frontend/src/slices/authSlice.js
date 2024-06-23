import { createSlice } from '@reduxjs/toolkit';

import {
  setItemStorage,
  getItemStorage,
  clearStorage,
} from '../utils/authLocalStorage.js';

// Начальное значение
const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload;

      setItemStorage({ username, token });

      return { ...state, username, token };
    },
    getCredentials: () => {
      const data = getItemStorage();
      return data;
    },
    deleteCredentials: (state) => {
      clearStorage();

      return { ...state, initialState };
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setCredentials, getCredentials, deleteCredentials } =
  authSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default authSlice.reducer;
