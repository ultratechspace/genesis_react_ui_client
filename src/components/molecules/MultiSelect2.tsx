/* eslint-disable react/display-name */
import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Multiselect from "multiselect-react-dropdown";

const useStyles = makeStyles((theme: Theme) => createStyles({}));
const MenuProps = {
  PaperProps: {},
  getContentAnchorEl: null,
};
interface Props {
  allValues: any;
  onSelect: any;
  onRemove?: any;
  selctedItems?: any;
  errorText?: any;
  displayValue?: any;
  placeholder?: any;
  ref?: any;
}
const MultiSelect2 = React.forwardRef(
  (
    { allValues, onSelect, onRemove, selctedItems, errorText, displayValue, placeholder }: Props,
    ref: any
  ) => {
    const classes = useStyles();
    const multiselectRef: any = React.createRef();
    const resetValues = () => {
      multiselectRef?.current.resetSelectedValues();
    };
    React.useImperativeHandle(ref, () => ({
      getUpdated() {
        resetValues();
      },
    }));
    return (
      <div>
        <Box>
          <Multiselect
            showCheckbox={true}
            closeOnSelect={true}
            options={allValues}
            selectedValues={selctedItems}
            displayValue={displayValue}
            onSelect={onSelect}
            onRemove={onRemove}
            placeholder={placeholder}
            ref={multiselectRef}
          />
          <span style={{ color: "red" }}>{errorText} </span>
        </Box>
      </div>
    );
  }
);
export default MultiSelect2;
