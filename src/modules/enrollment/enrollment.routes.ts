import InfoIcon from "@material-ui/icons/Info";
import { IRoute } from "../../common/typings/routes";
import { Main } from "./enrollment";
import { Enrollment } from "./pages/enrollment";

export const EnrollmentRoute: IRoute = {
  title: "Enrollment",
  path: "/enrollment",
  component: Main,
  guard: true,
  subRoutes: [
    { icon: InfoIcon, component: Enrollment, path: "", title: "Enrollment" },
  ],
};
