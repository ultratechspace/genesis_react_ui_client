import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { settingsSlice } from "./settings/settingsSlice";

/**
 * @link https://redux-toolkit.js.org/tutorials/typescript Redux-Toolkit Typescript Docs
 */
export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type IActionMeta<T = void> = {
  requestId: string;
  requestStatus: "pending" | "fulfilled" | "rejected";
  arg?: T;
  aborted?: boolean;
  condition?: boolean;
  rejectedWithValue?: boolean;
};
