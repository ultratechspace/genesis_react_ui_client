import InfoIcon from "@material-ui/icons/Info";
import { IRoute } from "../../common/typings/routes";
import { Main } from "./Dashboard";
import { Dashboard } from "./pages/Dashboard";

export const DashboardRoute: IRoute = {
  title: "Dashboard",
  path: "/dashboard",
  component: Main,
  guard: true,
  subRoutes: [{ icon: InfoIcon, component: Dashboard, path: "", title: "Dashboard" }],
};
