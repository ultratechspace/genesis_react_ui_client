import React from "react";
import { Redirect } from "react-router-dom";
import { userIsAuth } from "../../../common/utils/authorizedRoute";
import { userAttribs } from "../../../common/utils/userAttribs4mLocalStorage";

interface Props {
  children: React.ReactNode;
  redirectPath: string;
  path: string;
}

export function RouteGuard(props: Props) {
  return userAttribs() ? (
    userIsAuth() ? (
      <>{props.children}</>
    ) : (
      <Redirect
        to={{
          pathname: localStorage.getItem("defaultRoute") || "/unauthorized",
        }}
      />
    )
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
}
