import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: 500,
    marginTop: "10px",
    "& .MuiDataGrid-columnHeaderWrapper": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    "& .MuiDataGrid-columnHeaderWrapper .MuiIconButton-label svg": { color: "rgba(255,255,255,1)" },
    "& .MuiDataGrid-root .MuiDataGrid-cellLeft.MuiDataGrid-cellWithRenderer": {
      paddingTop: 5,
    },
  },
  gridContainer: {
    "& .MuiDataGrid-window": {
      overflowX: "auto",
    },
    "& .MuiDataGrid-pinnedColumnHeaders": {
      backgroundColor: "#282C33",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: "#fff",
  },
  label: {
    marginTop: theme.spacing(1),
    fontSize: 16,
    color: "#0B3C5D",
  },
  deletedRow: {
    color: "red",
  },
}));
