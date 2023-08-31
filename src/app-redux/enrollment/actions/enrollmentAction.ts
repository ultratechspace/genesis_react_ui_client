import { ax } from "../../../common/api/apiClient";
import { IApi } from "../../../common/typings/app";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEnrollment = createAsyncThunk("enrollment/getEnrollment", async (payload: any) => {
  try {
    const { skip, take, status = "", course = "" } = payload;

    const res = await ax.get<IApi>(
      `/enrollment?skip=${skip}&take=${take}&status=${status}&course=${course}`,
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
