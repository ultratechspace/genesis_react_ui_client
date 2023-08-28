import React, { ReactElement } from "react";
import { Box, Button } from "@material-ui/core";

interface Props {
  onClick?: any;
  children: any;
  isGreen?: any;
  disable?: boolean;
  primary?: boolean;
  style?: any;
  cssClass?: any;
}

export default function CommonButton({
  onClick,
  children,
  isGreen = false,
  disable = false,
  primary,
  cssClass,
  style,
}: Props): ReactElement {
  return (
    <Box component="span" mr={2} mb={1}>
      <Button
        variant="contained"
        color={primary ? "primary" : isGreen ? "secondary" : "default"}
        size="small"
        component="label"
        style={style}
        onClick={onClick}
        disabled={disable}
        disableElevation
        className={cssClass}
      >
        {children}
      </Button>
    </Box>
  );
}
