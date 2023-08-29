import React from "react";
import { Layout } from "../../components/layout/Layout";
import { ModuleRouter } from "../../components/molecules/ModuleRouter";
import { EnrollmentRoute } from "./enrollment.routes";

export function Main() {
  return (
    <Layout>
      {EnrollmentRoute.subRoutes && (
        <ModuleRouter subRoutes={EnrollmentRoute.subRoutes} path={EnrollmentRoute.path} />
      )}
    </Layout>
  );
}
