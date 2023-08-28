import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";

export interface IRoute {
  title: string;
  path: string;
  component: ReactElement;
  pathParam?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  guard?: boolean;
  noDrawer?: boolean;
  subRoutes?: IRoute[];
}
