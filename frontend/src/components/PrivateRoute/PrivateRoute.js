import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/authentication';
import NAVIGATION from '../../navigation.json';

function PrivateRoute({ children, ...rest }) {
  const { authToken } = useAuth();
  return (
    <Route {...rest}>
      {authToken
        ? (children)
        : <Redirect to={NAVIGATION.LOGIN} />}
    </Route>
  );
}

export default PrivateRoute;
