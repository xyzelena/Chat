import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth.js';

const PrivateRoute = ({ children }) => {
  const authHandle = useAuth();
  const location = useLocation();

  return authHandle.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
