import React, { ReactElement } from "react";
import { Grid, Typography, Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  pageHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: "#000",
    lineHeight: "28px",
  },
}));
interface Props {
  heading?: string;
}

export default function CardHeader({ heading = "Enter a heading here..." }: Props): ReactElement {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Typography className={classes.pageHeading}>{heading}</Typography>
      </Grid>
    </>
  );
}
