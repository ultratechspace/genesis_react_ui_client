import React from "react";
import { useHistory } from "react-router";
import { Box, Grid, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logo from "../../assets/images/logo_header.svg";
import { useAppDispatch } from "../../app-redux/hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      marginTop: "10px",
    },
  }),
);

export function Header() {
  const history = useHistory();
  // const dispatch = useAppDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="toolBar">
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Box mt={1} mb={1} my={1}>
                  <img src={Logo} alt="logo" width="50%" />
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Box className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  className="headerTopUserInfo"
                >
                  <AccountCircle />
                  <Typography className="userName">
                    {localStorage.getItem("UserFullName")}
                  </Typography>
                  <ExpandMoreIcon className="downArrow"></ExpandMoreIcon>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={async () => {
                      localStorage.clear();
                      history.push("/auth/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
