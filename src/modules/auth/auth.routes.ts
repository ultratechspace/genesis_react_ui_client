import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import { IRoute } from "../../common/typings/routes";
import { AuthModule } from "./AuthModule";
import { LoginPage } from "./pages";

export const AuthRoute: IRoute = {
  title: "Auth Module",
  path: "/auth",
  icon: HomeIcon,
  component: AuthModule,
  subRoutes: [{ icon: InfoIcon, component: LoginPage, path: "/login", title: "Auth Login" }],
};
