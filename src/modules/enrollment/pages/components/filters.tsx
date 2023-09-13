import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import { useStyles } from "./style";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ClearIcon from "@mui/icons-material/Clear";
import IosShareIcon from "@mui/icons-material/IosShare";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "../../../../app-redux/hooks";
import { coursesRec } from "../../../../app-redux/enrollment/enrollmentSlice";

type Props = {
  statusHandler: any;
  courceHandler: any;
  behaviourHandler: any;
};

export function EnrollmentFilters({
  statusHandler,
  courceHandler,
  behaviourHandler,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
  const [anchorE3, setAnchorE3] = useState<null | HTMLElement>(null);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isBehavoiurOpen, setIsBehavoiurOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusList = ["backlog", "completed"];
  const courseList = useAppSelector(coursesRec);
  const behaviourList = [
    "Back Up When Leaving",
    "Hard Acceleration",
    "Harsh Braking",
  ];
  const formik = useFormik({
    initialValues: {
      search: "",
      behaviour: [],
      courses: [],
      status: [],
    },
    onSubmit: async (values: any) => {
      //
    },
  });

  const handleBehaviourClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsBehavoiurOpen(true);
  };

  const handleCoursesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
    setIsCoursesOpen(true);
  };

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE3(event.currentTarget);
    setIsStatusOpen(true);
  };

  const behaviourHandleMenuClose = () => {
    setAnchorEl(null);
    setIsBehavoiurOpen(false);
  };

  const coursesHandleMenuClose = () => {
    setAnchorE2(null);
    setIsCoursesOpen(false);
  };

  const statusHandleMenuClose = () => {
    setAnchorE3(null);
    setIsStatusOpen(false);
  };

  const handleBehaviourOptionToggle = (option: string) => () => {
    const currentIndex = formik.values.behaviour.indexOf(option);
    const newbehaviour = [...formik.values.behaviour];
    if (currentIndex === -1) {
      newbehaviour.push(option);
    } else {
      newbehaviour.splice(currentIndex, 1);
    }
    formik.setFieldValue("behaviour", newbehaviour);
    behaviourHandler(newbehaviour.join(","));
  };

  const handleCoursesOptionToggle = (option: string) => () => {
    const currentIndex = formik.values.courses.indexOf(option);
    const newcourses = [...formik.values.courses];
    if (currentIndex === -1) {
      newcourses.push(option);
    } else {
      newcourses.splice(currentIndex, 1);
    }
    formik.setFieldValue("courses", newcourses);
    courceHandler(newcourses.join(","));
  };

  const handleStatusOptionToggle = (option: string) => () => {
    const currentIndex = formik.values.status.indexOf(option);
    const newstatus = [...formik.values.status];
    if (currentIndex === -1) {
      newstatus.push(option);
    } else {
      newstatus.splice(currentIndex, 1);
    }
    formik.setFieldValue("status", newstatus);
    statusHandler(newstatus.join(","));
  };

  const handleClear = () => {
    //
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Grid item xs={4}>
        <TextField
          className={"customTextField"}
          size="small"
          //   fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          label="Search"
          name="search"
          type="text"
          value={formik.values.search}
          onChange={formik.handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton disabled aria-label="toggle search" edge="end">
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={4} justifyContent="center" display="flex">
        <Box>
          <Box
            display="flex"
            onClick={handleBehaviourClick}
            style={{ cursor: "pointer" }}
          >
            <Typography aria-controls="dropdown-menu" aria-haspopup="true">
              Behaviours
            </Typography>
            <span>
              {" "}
              {isBehavoiurOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
          </Box>

          <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={behaviourHandleMenuClose}
            style={{ height: "50%" }}
          >
            {behaviourList.map((option) => (
              <MenuItem
                key={option}
                onClick={handleBehaviourOptionToggle(option)}
              >
                <Checkbox
                  checked={formik.values.behaviour.indexOf(option) > -1}
                />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box style={{ marginLeft: "15px", marginRight: "15px" }}>
          <Box
            display="flex"
            onClick={handleCoursesClick}
            style={{ cursor: "pointer" }}
          >
            <Typography aria-controls="dropdown-menu" aria-haspopup="true">
              Courses
            </Typography>
            <span>
              {" "}
              {isCoursesOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
          </Box>

          <Menu
            id="dropdown-menu"
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={coursesHandleMenuClose}
            style={{ height: "50%" }}
          >
            {courseList.map((option: any) => (
              <MenuItem
                key={option.id}
                onClick={handleCoursesOptionToggle(option.id)}
              >
                <Checkbox
                  checked={formik.values.courses.indexOf(option.id) > -1}
                />
                <ListItemText primary={option.name} />
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box>
          <Box
            display="flex"
            onClick={handleStatusClick}
            style={{ cursor: "pointer" }}
          >
            <Typography aria-controls="dropdown-menu" aria-haspopup="true">
              Status
            </Typography>
            <span>
              {" "}
              {isStatusOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
          </Box>

          <Menu
            id="dropdown-menu"
            anchorEl={anchorE3}
            open={Boolean(anchorE3)}
            onClose={statusHandleMenuClose}
            style={{ height: "50%" }}
          >
            {statusList.map((option) => (
              <MenuItem key={option} onClick={handleStatusOptionToggle(option)}>
                <Checkbox checked={formik.values.status.indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          display="flex"
          onClick={() => handleClear()}
          style={{ cursor: "pointer", marginLeft: "15px" }}
        >
          <Typography>Clear</Typography>
          <span>
            <ClearIcon />
          </span>
        </Box>
      </Grid>
      <Grid item xs={4} justifyContent="end" display="flex">
        <Box
          display="flex"
          onClick={() => handleClear()}
          style={{ cursor: "pointer", color: "red" }}
        >
          <span>
            <ClearIcon />
          </span>
          <Typography>Cancel Enrollment</Typography>
        </Box>

        <Box
          display="flex"
          onClick={() => handleClear()}
          style={{
            cursor: "pointer",
            color: "#2a3d75",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <span>
            <SendIcon />
          </span>
          <Typography>Send Notification</Typography>
        </Box>

        <Box
          display="flex"
          onClick={() => handleClear()}
          style={{ cursor: "pointer", color: "#2a3d75" }}
        >
          <span>
            <IosShareIcon />
          </span>
          <Typography>Export</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
