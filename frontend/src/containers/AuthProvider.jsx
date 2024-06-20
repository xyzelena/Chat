import { useState } from 'react';

import AuthContext from '../contexts/AuthContext.jsx';

import { clearStorage } from '../utils/authLocalStorage.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
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
