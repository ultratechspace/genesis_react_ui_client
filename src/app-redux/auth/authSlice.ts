import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { handleLogin, loginAction, loginFailed } from "./actions/authActions";

export interface AuthState {
  user?: any;
  status:
    | "idle"
    | "loading"
    | "failed"
    | "passwordResetRequired"
    | "PasswordResetSuccessfull";
  resetEmail?: string;
  authError?: string;
  token?: string;
  payLoadValues: any;
}

const initialState: AuthState = {
  status: "idle",
  payLoadValues: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetErrorAction: (state) => {
      delete state.authError;
    },
    setPayloadValues: (state: any, value) => {
      state.payLoadValues = value.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = "loading";
        delete state.authError;
      })
      .addCase(loginAction.fulfilled, handleLogin)
      .addCase(loginAction.rejected, loginFailed);
  },
});

export const { resetErrorAction, setPayloadValues } = authSlice.actions;

export const selectStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.authError;
export const selectUser = (state: RootState) => state.auth.user;
export const isLogin = (state: RootState) => {
  return Boolean(state.auth.user?.Username);
};
export const payLoadValues = (state: RootState) => state.auth.payLoadValues;
