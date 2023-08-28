import { ThemeOptions } from "@material-ui/core/styles";

export const customTheme: ThemeOptions = {
  palette: {
    // type: "dark",
    primary: {
      main: "#0B3C5D",
    },
    secondary: {
      main: "#72CA00",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    fontSize: 12,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    button: { textTransform: "none" },
  },
  overrides: {
    // MuiButton: { containedSecondary: { color: "white" } },
    // MuiDataGrid: { columnHeaderWrapper: { backgroundColor: "#0B3C5D" } },
  },
};
