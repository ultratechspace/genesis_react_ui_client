import { Theme, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: 500,
    "& .MuiDataGrid-columnHeaderWrapper": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    "& .MuiDataGrid-columnHeaderWrapper .MuiIconButton-label svg": { color: "rgba(255,255,255,1)" },
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
  },
  cardMain: {
    marginBottom: "0px",
    paddingTop: "2px",
    width: "calc(100%)",
    overflow: "auto",
  },
  pageHeading: {
    fontSize: theme.typography.pxToRem(20),
    // fontWeight: theme.typography.fontWeightRegular,
    color: "#000",
  },
  multiselectConfigFileCompression: {
    position: "relative",
    paddingLeft: "4px",
    "& .searchWrapper": {
      border: "none",
      maxHeight: "35px",
      overflow: "auto",
    },
    "& ::placeholder": {
      color: "#bcbcbc",
    },
  },

  groupTitle: {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 800,
    color: "#404040",
  },
}));
