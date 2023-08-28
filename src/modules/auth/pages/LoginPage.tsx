import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, Theme } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { loginAction } from "../../../app-redux/auth/actions/authActions";
import {
  resetErrorAction,
  selectStatus,
  setPayloadValues,
} from "../../../app-redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import Logo from "../../../assets/images/logo_header.svg";
import { useFormik } from "formik";
import { menus } from "../../../common/utils/app.menu";
import { validationSchema } from "../components/validationSchema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: "#fff",
    },
  })
);

export function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(resetErrorAction());
  }, []);

  const authStatus = useAppSelector(selectStatus);

  const [state, setState] = useState({ showPassword: false });

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const model = {
        email: values.email,
        password: values.password,
      };
      const res = await dispatch(loginAction(model)); // LoginAction
      const response: any = res?.payload;
      if (response) {
        if (!response.twoFARequired) {
          localStorage.setItem("UserMenus", JSON.stringify(menus));
          if (menus.length) {
            localStorage.setItem(
              "defaultRoute",
              menus[0].routeName + menus[0].childMenus[0].routeName
            );

            const allowedRoutes: any = [];
            menus.forEach((menuItem: any) => {
              allowedRoutes.push(menuItem.routeName);
              const arr: any[] = menuItem.childMenus;
              if (arr.length) {
                arr.forEach((subItem: any) => {
                  allowedRoutes.push(menuItem.routeName + subItem.routeName);
                });
              }
            });
            localStorage.setItem("allowedRoutes", JSON.stringify(allowedRoutes));

            history.push(menus[0].routeName + menus[0].childMenus[0].routeName); // Dynamic Menus
          } else {
            localStorage.setItem("defaultRoute", "/unauthorized");
            localStorage.setItem("allowedRoutes", JSON.stringify([]));
            history.push("/unauthorized");
          }
        } else {
          dispatch(setPayloadValues(res.meta?.arg));
        }
      }
    },
  });

  return (
    <>
      <Backdrop className={classes.backdrop} open={Boolean(authStatus === "loading")}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container>
        <Grid item xs={12} sm={12} lg={7}></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box width="60%">
            <Box my={4} textAlign="center">
              <img src={Logo} alt="logo" width="80%" />
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Box m={4} />
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Password"
                name="password"
                type={state.showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box m={4} />

              <Button
                className="login-button"
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Log In
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
