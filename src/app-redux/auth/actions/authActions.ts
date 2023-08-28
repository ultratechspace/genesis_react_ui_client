import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ax } from "../../../common/api/apiClient";
import { IApi } from "../../../common/typings/app";
import { IActionMeta } from "../../store";
import { AuthState } from "../authSlice";

type ILoginArgs = {
  email: string;
  password: string;
};

export const loginFailed = (
  state: AuthState,
  action: PayloadAction<
    unknown,
    string,
    IActionMeta<ILoginArgs>,
    { code?: string; message?: string; name?: string }
  >,
) => {
  delete state.user;
  state.authError = action?.error?.message || "An Unexpected Error Occurred";
};
export const handleLogin = (state: AuthState) => {
  state.status = "idle";
  delete state.authError;
};

export const loginAction = createAsyncThunk("auth/loginAction", async (user: ILoginArgs) => {
  try {
    const res = await ax.post<IApi>("/login", user);
    if (res.data.value) {
      localStorage.clear();
      localStorage.setItem("token", res.data.value.token);
      localStorage.setItem("UserFullName", res.data.value.userFullName);
      localStorage.setItem("UserId", res.data.value.userId);
      return res.data.value;
    } else {
      localStorage.clear();
    }
  } catch (error: any) {
    if (error.code === "PasswordResetRequiredException")
      throw { code: error.code, message: "Password Reset Required" };
    throw error;
  }
});
