import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { customTheme } from "./customTheme";

interface Props {
  children: React.ReactNode;
}
export function CustomMuiTheme(props: Props) {
  const theme = createMuiTheme(customTheme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
