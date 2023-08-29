import React, { useEffect, useRef, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Header } from "./Header";
import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100vh",
    },
    backdrop: {
      zIndex: theme.zIndex.modal + 2,
      color: "#fff",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      maxHeight: "100vh",
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      overflowX: "clip",
      marginTop: "10px",
    },
    hidden: {
      overflow: "hidden",
      background: "red",
    },
  }),
);

interface Props {
  children: React.ReactNode;
}

export function Layout(props: Props) {
  const classes = useStyles();

  useEffect(() => {
    if (document.body.classList.contains("hidden")) {
      document.body.classList.remove("hidden");
    }
  });
  return (
    <>
      <Backdrop className={classes.backdrop} open={status == "loading"}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.root}>
        <Header />
        <main id="main-scrollable-element" className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
}
