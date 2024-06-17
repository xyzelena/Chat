import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import AuthContext from '../../contexts/index.jsx';
import useAuth from '../../hooks/index.jsx';

import Chat from '../../pages/Chat/Chat.jsx';
import Login from '../../pages/Login/Login.jsx';
import SignUp from '../../pages/SignUp/SignUp.jsx';
import NotFound from '../../pages/NotFound/NotFound.jsx';

import ROUTES from '../../utils/routes.js';

import './App.css';

const App = () => {
  console.log(ROUTES);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />}>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.signup} element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
