import React , {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuthInfo , checkTokenStatus} from "../helpers/Auth";

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  let auth = getAuthInfo();
  return (
    <Route {...rest} render={(props) => (
      (auth && auth.role === role) ? 
        <Component {...props} />
        : <Redirect to='/login' />
    )}
    />   
  )
};

export default PrivateRoute;
