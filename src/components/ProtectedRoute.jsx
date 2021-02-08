import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ exact, path, component }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch(`https://family-matters-api.herokuapp.com/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status >= 400) {
          throw new Error("not authorized");
        } else {
          setAuth(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }
    checkAuthStatus();
  }, []);

  if (!loading && !auth) {
    return <Redirect to="/sign-in" />;
  } else {
    return (
      !loading && (
        <Route exact={exact} path={path} component={component} />
      )
    );
  }
}