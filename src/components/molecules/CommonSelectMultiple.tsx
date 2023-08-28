import React from "react";
import { Checkbox, FormControl, ListItemText } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: "100%",
    },
    CommonSelect: {
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {
  inputLabel: string;
  name: string;
  allValues: any;
  value: string[];
  onChange: any;
  cssClassName?: string;
  style?: any;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CommonSelectMultiple({
  inputLabel,
  name,
  allValues,
  value,
  onChange,
  cssClassName,
  style,
}: Props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl
        variant="outlined"
        size="small"
        className={`${classes.formControl} ${cssClassName}`}
      >
        <InputLabel id="demo-simple-select-outlined-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          multiple
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${classes.CommonSelect}`}
          label={inputLabel}
          style={style}
          renderValue={(selected: any) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {allValues.map((item: any, i: any) => (
            <MenuItem key={i} value={item.name}>
              <Checkbox checked={value?.indexOf(item.name) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
