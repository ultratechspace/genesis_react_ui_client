import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from "formik";

const style = {
  groupTitle: {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 700,
    color: "#404040",
  },
};

export function EnrollmentGroups() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const sortByListList = ["Name", "Created Date"];
  const [isSortByOpen, setIsBehavoiurOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const formik = useFormik({
    initialValues: {
      sortBy: "",
    },
    onSubmit: async (values: any) => {
      //
    },
  });

  const handleSortByClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsBehavoiurOpen(true);
  };

  const handleMenuIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleByOptionToggle = (option: string) => () => {
    formik.setFieldValue("sortBy", option);
    console.log(option);
  };

  const sortByHandleMenuClose = () => {
    setAnchorEl(null);
    setIsBehavoiurOpen(false);
  };

  const MenuIconHandleMenuClose = () => {
    setAnchorE2(null);
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
              <span> {isSortByOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
            </Box>

            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={sortByHandleMenuClose}
              style={{ height: "50%", width: "10px" }}
            >
              {sortByListList.map((option) => (
                <MenuItem key={option} onClick={handleByOptionToggle(option)}>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Grid>

        {/* <Grid item xs={2}>
          <Box>
            <Box display="flex" onClick={handleMenuIconClick} style={{ cursor: "pointer" }}>
              <Typography aria-controls="dropdown-menu-1" aria-haspopup="true">
                <MoreVertIcon />
              </Typography>
            </Box>

            <Menu
              id="dropdown-menu-1"
              anchorEl={anchorE2}
              open={Boolean(anchorE2)}
              onClose={MenuIconHandleMenuClose}
              style={{ height: "50%", width: "10px" }}
            >
              <MenuItem key="Clear All Section">
                <ListItemText primary="Clear All Section" />
              </MenuItem>
              <MenuItem key="Close ALl">
                <ListItemText primary="Close ALl" />
              </MenuItem>
            </Menu>
          </Box>
        </Grid> */}
      </Grid>

      {/* <Box mt={2} mr={2}>
        <FormControl
          variant="filled"
          fullWidth
          // className={"customTextField"}
          size="small"
          //   fullWidth
        >
          <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
    </Box>
  );
}
