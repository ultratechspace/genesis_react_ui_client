import React from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { customTheme } from "./customTheme";

interface Props {
  children: React.ReactNode;
}
export function CustomMuiTheme(props: Props) {
  // const dispatch = useAppDispatch();
  // const goDarkState = useAppSelector(selectThemeType);

  // const goDarkQuery = useMediaQuery("(prefers-color-scheme: dark)");
  // useEffect(() => {
  //   dispatch(themeTypeAction(null));
  // }, [dispatch, goDarkQuery]);

  // const theme = useMemo(
  //   () =>
  //     createMuiTheme({
  //       ...customTheme,
  //       palette: {
  //         ...customTheme.palette,
  //         type: goDarkState ? goDarkState : goDarkQuery ? "dark" : "light",
  //       },
  //     }),
  //   [goDarkQuery, goDarkState]
  // );
  const theme = createMuiTheme(customTheme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
