import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { login } = useContext(UserContext);
  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  }
  // nesse return pode ser feito um componente de loading
  return <></>;
};

export default ProtectedRoute;
