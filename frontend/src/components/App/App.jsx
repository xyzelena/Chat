import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useSocket from '../../hooks/useSocket.js';

import {
  addChannel,
  setEditChannel,
  removeChannel,
} from '../../slices/channelsSlice.js';

import { addMessage } from '../../slices/messagesSlice.js';

import AuthProvider from './AuthProvider.jsx';
import PrivateRoute from './PrivateRoute.jsx';

import Header from '../Header/Header.jsx';

import Chat from '../../pages/Chat/Chat.jsx';
import Login from '../../pages/Login/Login.jsx';
import SignUp from '../../pages/SignUp/SignUp.jsx';
import NotFound from '../../pages/NotFound/NotFound.jsx';

import ROUTES from '../../utils/routes.js';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  useEffect(() => {
    socket.on('connect_error', () => {
      socket.connect();
    });

    socket.on('reconnect_attempt', () => {
      socket.connect();
    });

    socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
    });

    socket.on('renameChannel', (updatedChannel) => {
      dispatch(setEditChannel(updatedChannel));
    });

    socket.on('removeChannel', (id) => {
      dispatch(removeChannel(id));
    });

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('connect_error');
      socket.off('reconnect_attempt');
      socket.off('newChannel');
      socket.off('renameChannel');
      socket.off('removeChannel');
      socket.off('newMessage');
    };
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home()} element={<Header />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route path={ROUTES.login()} element={<Login />} />
            <Route path={ROUTES.signup()} element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
