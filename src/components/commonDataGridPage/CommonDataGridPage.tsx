import React from "react";
import { Box, Card, CardContent } from "@material-ui/core";
import { useStyles } from "./styles";
import TabHeader from "../tabHeader/TabHeader";
import CardHeader from "../cardHeader/CardHeader";

type Props = {
  module: string;
  children: any;
  heading: string;
  GridDataComp?: any;
};

export default function CommonDataGridPage({ module, children, heading, GridDataComp }: Props) {
  const classes = useStyles();

  return (
    <>
      <TabHeader module={module || "module"} heading={heading || "heading"} />
      <Box m={2} />
      <Card>
        <CardContent className={classes.cardMain}>
          <CardHeader heading={heading || "heading"} />
          <Card>
            <CardContent className={classes.cardSec}>{children}</CardContent>
            {GridDataComp && GridDataComp}
          </Card>
        </CardContent>
      </Card>
    </>
  );
}
