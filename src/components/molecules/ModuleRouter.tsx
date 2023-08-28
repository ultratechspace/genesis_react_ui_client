import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { IRoute } from "../../common/typings/routes";

interface Props {
  subRoutes: IRoute[];
  path: string;
}

export function ModuleRouter({ subRoutes, path }: Props): React.ReactElement {
  const match = useRouteMatch();
  const mainPage =
    subRoutes.length && Boolean(localStorage.getItem("UserMenus"))
      ? match.path === "/unauthorized"
        ? "/unauthorized"
        : JSON.parse(localStorage.getItem("UserMenus") || "")?.find(
            (menuItem: any) => menuItem.routeName === match.path,
          )?.childMenus[0]?.routeName
      : match.path === "/auth"
      ? "/login"
      : "";
  return (
    <Switch>
      {subRoutes?.map((route, i) => (
        <Route
          key={i}
          path={match.path + route.path + (route.pathParam || "")}
          component={route.component}
        />
      ))}
      {/* <Route path={match.url} exact component={() => <h3>Module root</h3>} /> */}
      <Redirect to={{ pathname: match.path + mainPage }} />
    </Switch>
  );
}
