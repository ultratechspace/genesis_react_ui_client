import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography, Link as MuiLink, makeStyles, Theme } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme: Theme) => ({
  breadcrumbs: {
    fontSize: theme.typography.pxToRem(12),
  },
  selectedBreadCrumb: {
    color: "#00A3FF",
    fontSize: theme.typography.pxToRem(12),
    textDecoration: "underline",
  },
}));
interface Props {
  heading?: string;
  module?: string;
  link?: string;
}

export default function TabHeader({
  heading = "Enter a heading",
  module = "Enter Module Name...",
  link = "#",
}: Props): ReactElement {
  const classes = useStyles();
  return (
    <Breadcrumbs
      className={classes.breadcrumbs}
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="inherit" />}
    >
      <MuiLink color="inherit" component={Link} to={`${link}`}>
        {module}
      </MuiLink>
      <Typography className={classes.selectedBreadCrumb}>{heading}</Typography>
    </Breadcrumbs>
  );
}
