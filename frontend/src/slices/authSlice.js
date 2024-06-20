import { createSlice, current } from '@reduxjs/toolkit';

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
      // state.username = action.payload.username;
      // state.token = action.payload.token;

      //console.log(current(state));

      return { ...state, username, token };
    },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { setCredentials } = authSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default authSlice.reducer;
