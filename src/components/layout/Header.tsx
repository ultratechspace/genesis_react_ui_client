import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logo from "../../assets/images/logo_header.svg";
import { useAppDispatch } from "../../app-redux/hooks";
import { HeaderContent } from "./HeaderContent";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionDesktop: {
      // display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      marginRight: "10px",
    },
    logoDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    toolbar: {
      background: "#f5f5f5",
      color: "black",
      height: "80px",
      padding: "8px",
      paddingRight: "30",
    },
  }),
);

export function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
    <AppBar position="fixed" elevation={1}>
      <Box maxWidth="auto">
        <Toolbar disableGutters className={classes.toolbar}>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <img src={Logo} alt="logo" height="35px" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={NavLink} to="/dashboard">
                <Typography textAlign="center" style={{ color: "black" }}>
                  DASHBOARD
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={NavLink} to="/enrollment">
                <Typography textAlign="center" style={{ color: "black" }}>
                  ENROLLMENTS
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <HeaderContent />
          </Box>

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
              <Typography className="userName">{localStorage.getItem("UserFullName")}</Typography>
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
        </Toolbar>
      </Box>
    </AppBar>
  );
}
