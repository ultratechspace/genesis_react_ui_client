import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardMain: {
      marginBottom: "0px",
      paddingTop: "2px",
      width: "calc(100%)",
    },
    cardSec: {
      paddingBottom: 0,
    },
  }),
);
