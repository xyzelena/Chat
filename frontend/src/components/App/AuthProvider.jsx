import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import AuthContext from '../../contexts/AuthContext.js';

import { updateUserData } from '../../slices/authSlice.js';

import {
  setItemStorage,
  getItemStorage,
  clearStorage,
} from '../../utils/authLocalStorage.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const isLoggedIn = !!getItemStorage();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const logIn = useMemo(
    () => (data) => {
      setItemStorage(data);
      dispatch(updateUserData(data));
      setLoggedIn(true);
    },
    [dispatch],
  );

  const logOut = useMemo(
    () => () => {
      clearStorage();
      dispatch(updateUserData({ username: '', token: '' }));
      setLoggedIn(false);
    },
    [dispatch],
  );

  const contextValue = useMemo(
    () => ({ loggedIn, logIn, logOut }),
    [loggedIn, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
