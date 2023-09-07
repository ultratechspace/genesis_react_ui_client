import React, { useState } from "react";
import { Box, Card, Typography, CardContent, Grid, Divider } from "@material-ui/core";
import { DashboardRoute } from "../dashboard.routes";
import TabHeader from "../../../components/TabHeader/TabHeader";
import { useStyles } from "./components/style";

interface Props {}

export function Dashboard({}: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      {/* <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <TabHeader module={DashboardRoute.title} heading={DashboardRoute.title} />
      <Box m={2} />
      <Card>
        <CardContent className={classes.cardMain}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item md={8}>
              <Box mt={1} mb={2}>
                <Typography className={classes.pageHeading}>{DashboardRoute.title}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider />
        </CardContent>
      </Card>
    </>
  );
}
