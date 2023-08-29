import React, { useState } from "react";
import { Box, Card, Typography, CardContent, Grid, Divider } from "@material-ui/core";
import { EnrollmentRoute } from "../enrollment.routes";
import TabHeader from "../../../components/tabHeader/TabHeader";
import { useStyles } from "./components/style";

interface Props {}

export function Enrollment({}: Props): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      {/* <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <TabHeader module={EnrollmentRoute.title} heading={EnrollmentRoute.title} />
      <Box m={2} />
      <Card>
        <CardContent className={classes.cardMain}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item md={8}>
              <Box mt={1} mb={2}>
                <Typography className={classes.pageHeading}>{EnrollmentRoute.title}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider />
        </CardContent>
      </Card>
    </>
  );
}
