import { useState } from 'react';

import AuthContext from '../contexts/AuthContext.jsx';

import {
  setItemStorage,
  getItemStorage,
  clearStorage,
} from '../utils/authLocalStorage.js';

const AuthProvider = ({ children }) => {
  const isLoggedIn = !!getItemStorage();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const logIn = (data) => {
    setItemStorage(data);
    setLoggedIn(true);
  };

  const logOut = () => {
    clearStorage();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
