import React from "react";
import { Redirect } from "react-router-dom";
import { userAttribs } from "../../../common/utils/userAttribs4mLocalStorage";

interface Props {
  children: React.ReactNode;
  redirectPath: string;
  path: string;
}

export function AuthGuard(props: Props) {
  return userAttribs() ? <>{props.children}</> : <Redirect to={{ pathname: props.redirectPath }} />;
}
