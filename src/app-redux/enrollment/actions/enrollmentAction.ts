import { ax } from "../../../common/api/apiClient";
import { IApi } from "../../../common/typings/app";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEnrollment = createAsyncThunk("enrollment/getEnrollment", async (payload: any) => {
  try {
    const { skip, take, status = "", course = "", driver = "" } = payload;

    const res = await ax.get<IApi>(
      `/enrollment?skip=${skip}&take=${take}&status=${status}&course=${course}&drivers=${driver}`,
    );
    if (res.status == 200 && res.data) return res.data;
    else throw new Error(res.statusText);
  } catch (error) {
    throw error;
  }
});

export const getCourses = createAsyncThunk("enrollment/getCourses", async () => {
  try {
    const res = await ax.get<IApi>("/client/course");
    if (res.status == 200 && res.data) return res.data;
    else throw new Error(res.statusText);
  } catch (error) {
    throw error;
  }
});

export const getGroups = createAsyncThunk("enrollment/getGroups", async () => {
  try {
    const res = await ax.get<IApi>("/group/?includeDrivers=true");
    if (res.status == 200 && res.data) return res.data;
    else throw new Error(res.statusText);
  } catch (error) {
    throw error;
  }
});

export const getDriversById = createAsyncThunk("enrollment/getDriver", async (parm: any) => {
  try {
    const res = await ax.get<IApi>(`/group/${parm}/drivers`);
    if (res.status == 200 && res.data) return res.data;
    else throw new Error(res.statusText);
  } catch (error) {
    throw error;
  }
});
