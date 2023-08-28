import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { userAttribs } from "../../../common/utils/userAttribs4mLocalStorage";

interface Props {
  children: React.ReactNode;
  redirectPath: string;
  path: string;
}

export function NoAuthGuard(props: Props) {
  return userAttribs() ? <Redirect to={{ pathname: props.redirectPath }} /> : <>{props.children}</>;
}
