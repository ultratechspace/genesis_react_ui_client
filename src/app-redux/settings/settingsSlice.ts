import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { setThemeType } from "./actions/setThemeType";

export type ThemeType = null | "light" | "dark";
export type INotify = {
  message: string;
  description?: string;
  options: { variant: "default" | "error" | "success" | "warning" | "info" };
};
export interface SettingsState {
  themeType: ThemeType;
  openMobileDrawer: boolean;
  notifications: Omit<INotify, "options">[];
  notify?: INotify;
}

const initialState: SettingsState = {
  themeType: null,
  openMobileDrawer: false,
  notifications: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    themeTypeAction: setThemeType,
    addNotificationAction: (state, { payload }: { payload: INotify }) => {
      state.notifications.unshift({ message: payload.message, description: payload.description });
      state.notify = payload;
    },
  },
});

export const { themeTypeAction, addNotificationAction } = settingsSlice.actions;

export const selectNotify = (state: RootState) => state.settings.notify;
export const selectThemeType = (state: RootState) => state.settings.themeType;
export const selectMobileDrawer = (state: RootState) => state.settings.openMobileDrawer;
