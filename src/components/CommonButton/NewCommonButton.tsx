import React, { ReactElement } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface Props {
  onClick?: any;
  children: any;
  isDefault?: boolean;
  isAdd?: boolean;
  isDelete?: boolean;
  isEdit?: boolean;
  isGreen?: boolean;
  disable?: boolean;
  primary?: boolean;
  style?: any;
  icon?: any;
  cssClass?: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {},
    default: { backgroundColor: "#e0e0e0", marginTop: "7px", color: "black" },
    deleteButton: { backgroundColor: "red", marginTop: "7px", color: "white" },
    editButton: { backgroundColor: "#1976d2", marginTop: "7px", color: "white" },
    greenButton: { backgroundColor: "#72CA00", marginTop: "7px", color: "white" },
  })
);

export default function NewCommonButton({
  onClick,
  children,
  isDefault,
  isAdd,
  isDelete,
  isEdit,
  isGreen,
  disable = false,
  style,
  icon,
  cssClass,
}: Props): ReactElement {
  const classes = useStyles();
  return (
    <Box component="span" mr={2} mb={1}>
      <Button
        className={`${
          isAdd
            ? classes.addButton
            : isDelete
            ? classes.deleteButton
            : isEdit
            ? classes.editButton
            : isGreen
            ? classes.greenButton
            : classes.default
        } ${cssClass}`}
        startIcon={icon ? icon : ""}
        variant="contained"
        color={isDefault ? "default" : "default"}
        size="small"
        component="label"
        style={style}
        onClick={onClick}
        disabled={disable}
        disableElevation
      >
        {children}
      </Button>
    </Box>
  );
}
