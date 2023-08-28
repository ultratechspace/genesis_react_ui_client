import React from "react";
import { Layout } from "../../components/layout/Layout";
import { ModuleRouter } from "../../components/molecules/ModuleRouter";
import { DashboardRoute } from "./dashboard.routes";

export function Main() {
  return (
    <Layout>
      {DashboardRoute.subRoutes && (
        <ModuleRouter subRoutes={DashboardRoute.subRoutes} path={DashboardRoute.path} />
      )}
    </Layout>
  );
}
