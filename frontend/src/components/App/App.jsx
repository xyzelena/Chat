import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { useState } from 'react';

import AuthContext from '../../contexts/AuthContext.jsx';
import useAuth from '../../hooks/useAuth.jsx';

import Header from '../Header/Header.jsx';

import Chat from '../../pages/Chat/Chat.jsx';
import Login from '../../pages/Login/Login.jsx';
import SignUp from '../../pages/SignUp/SignUp.jsx';
import NotFound from '../../pages/NotFound/NotFound.jsx';

import ROUTES from '../../utils/routes.js';

import './App.css';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.signup} element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
