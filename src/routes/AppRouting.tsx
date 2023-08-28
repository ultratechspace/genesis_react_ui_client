import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthGuard } from "../modules/auth/components/AuthGuard";
import { NoAuthGuard } from "../modules/auth/components/NoAuthGuard";
import { RouteGuard } from "../modules/auth/components/RouteGuard";
import { ROUTES } from "./routes";

export function AppRouting() {
  return (
    <BrowserRouter>
      <Switch>
        {ROUTES.map((route: any, i) => (
          <Route key={i} path={route.path}>
            {route.guard ? (
              <RouteGuard path={route.path} redirectPath="/auth/login">
                {<route.component />}
              </RouteGuard>
            ) : route.path.includes("/auth") ? (
              <NoAuthGuard path={route.path} redirectPath="/dashboard">
                {<route.component />}
              </NoAuthGuard>
            ) : (
              <AuthGuard path={route.path} redirectPath="/auth/login">
                {<route.component />}
              </AuthGuard>
            )}
          </Route>
        ))}
        <Redirect to={{ pathname: "/dashboard" }} />
      </Switch>
    </BrowserRouter>
  );
}
