import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setCredentials,
  getCredentials,
  deleteCredentials,
} from '../slices/authSlice.js';

import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  const isLoggedIn = () => !!dispatch(getCredentials());

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const logIn = (data) => {
    dispatch(setCredentials(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    dispatch(deleteCredentials());
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
