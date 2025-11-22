import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function RoleRoute({ component: Component, allowedRoles, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) return <Redirect to="/login" />;
        if (allowedRoles && !allowedRoles.includes(user.role)) {
          return <Redirect to="/unauthorized" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}
