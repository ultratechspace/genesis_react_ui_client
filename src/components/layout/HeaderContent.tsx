import * as React from "react";
import Typography from "@mui/material/Typography";
import { ROUTES } from "../../routes/routes";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";

const linkTitle = {
  color: "#a5abb5",
  fontWeight: 700,
  fontSize: "1.125rem",
};
const activeLinkTitle = {
  color: "#284492",
  fontWeight: 700,
  fontSize: "1.125rem",
};
export function HeaderContent() {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <List component="div" disablePadding style={{ display: "flex" }}>
      <ListItem button component={NavLink} to="/dashboard">
        <ListItemText>
          <Typography style={location.pathname == "/dashboard" ? activeLinkTitle : linkTitle}>
            DASHBOARD
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem button component={NavLink} to="/enrollment">
        <ListItemText>
          <Typography style={location.pathname == "/enrollment" ? activeLinkTitle : linkTitle}>
            ENROLLMENTS
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}
