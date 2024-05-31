import { BrowserRouter, Routes, Route, ProtectedRoute } from 'react-router-dom';

import Chat from  '../../pages/Chat/Chat.jsx';
import Login from  '../../pages/Login/Login.jsx';
import SignUp from  '../../pages/SignUp/SignUp.jsx';
import NotFound from  '../../pages/NotFound/NotFound.jsx';

import './App.css';

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route 
             path="/" 
             element={
                <Chat  />
             }
             >
               
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      );
}

export default App;
