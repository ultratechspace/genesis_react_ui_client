import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import { Button, ListItem } from "@mui/material";
import { useAppSelector } from "../../../../app-redux/hooks";
import { driverList, groupList } from "../../../../app-redux/enrollment/enrollmentSlice";
import { useDispatch } from "react-redux";
import { getDriversById } from "../../../../app-redux/enrollment/actions/enrollmentAction";

const style = {
  groupTitle: {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    color: "#404040",
  },
};

type Props = {
  driverhandler: any;
};

export function EnrollmentGroups({ driverhandler }: Props) {
  const groupRec: any = useAppSelector(groupList);
  const driverRec = useAppSelector(driverList);
  const [sortByAnchorEl, setSortByAnchorEl] = React.useState<null | HTMLElement>(null);
  const sortByList = ["Name", "Created Date"];
  const [isSortByOpen, setIsSortByOpen] = React.useState(false);
  const [openStates, setOpenStates] = React.useState<Record<number, boolean>>({});
  const dispatch = useDispatch();
  const [listGroup, setListGroup] = useState([]);

  React.useEffect(() => {
    setListGroup(groupRec);
  }, [groupRec]);

  const formik = useFormik({
    initialValues: {
      sortBy: "",
    },
    onSubmit: async (values: any) => {
      //
    },
  });

  const handleSortByClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortByAnchorEl(event.currentTarget);
    setIsSortByOpen(true);
  };

  const handleByOptionToggle = (option: string) => () => {
    formik.setFieldValue("sortBy", option);
    console.log(option);
    setIsSortByOpen(false);
  };

  const sortByHandleMenuClose = () => {
    setSortByAnchorEl(null);
    setIsSortByOpen(false);
  };

  const handleToggle = (index: number) => () => {
    setOpenStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index] || false,
    }));
  };

  const [checked, setChecked] = React.useState<number[]>([]);
  const [ischecked, setisChecked] = React.useState<number[]>([]);

  const handleChecked = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked.join(","));

    setChecked(newChecked);
    driverhandler(newChecked.join(","));
  };

  const handleCheckAll = (list: any, index: any) => {
    const currentIndex = ischecked.indexOf(index);
    const newChecked = [...ischecked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setisChecked(newChecked);
    const allCheck: any = [];

    for (const item of list) {
      const index = checked.indexOf(item?.id);
      if (index !== -1) {
        allCheck.splice(index, 1);
        checked.splice(index, 1);
      } else {
        allCheck.push(item?.id);
        checked.push(item?.id);
      }
    }
    driverhandler(allCheck.join(","));
  };

  const getDrivers = async (id: any, index: any) => {
    const { payload }: any = await dispatch(getDriversById(id));
    const { items } = payload;
    const groupRec1: any = [...listGroup];
    groupRec1[index] = { ...groupRec1[index], driverList: items };
    setListGroup(groupRec1);
    return;
  };

  return (
    <Box mt={3} ml={2}>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={5}>
          <Typography style={style.groupTitle}>Groups</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Box display="flex" onClick={handleSortByClick} style={{ cursor: "pointer" }}>
              <Typography aria-controls="dropdown-menu" aria-haspopup="true">
                Sort By
              </Typography>
              <span> {isSortByOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</span>
            </Box>

            <Menu
              id="dropdown-menu"
              anchorEl={sortByAnchorEl}
              open={isSortByOpen}
              onClose={sortByHandleMenuClose}
              style={{ height: "50%", width: "10px" }}
            >
              {sortByList.map((option) => (
                <MenuItem key={option} onClick={handleByOptionToggle(option)}>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Grid>
      </Grid>

      <Box style={{ overflow: "scroll", height: "470px" }}>
        {groupRec &&
          listGroup.map((value: any, index: any) => (
            <>
              {value?.driversCount > 1 && (
                <List
                  key={index}
                  sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <Box display="flex" onClick={() => getDrivers(value.id, index)}>
                    <Button
                      disabled={!value.driverList}
                      onClick={() => handleCheckAll(value?.driverList, index)}
                    >
                      <Checkbox
                        edge="start"
                        checked={ischecked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        disabled={!value.driverList}
                      />
                    </Button>
                    <ListItemButton onClick={handleToggle(index)}>
                      <ListItemText primary={value.name} />
                      {openStates[index] ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                    </ListItemButton>
                  </Box>
                  <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                      {driverRec &&
                        value?.driverList?.map((innerValue: any, innerIndex: any) => {
                          const labelId = `checkbox-list-label-${innerIndex}`;

                          return (
                            <ListItem key={innerIndex} disablePadding>
                              <ListItemButton
                                role={undefined}
                                onClick={handleChecked(innerValue.id)}
                                dense
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(innerValue.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={innerValue.name} />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                    </List>
                  </Collapse>
                </List>
              )}
            </>
          ))}
      </Box>
    </Box>
  );
}
