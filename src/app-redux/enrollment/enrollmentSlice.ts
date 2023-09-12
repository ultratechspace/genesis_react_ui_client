import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCourses, getDriversById, getEnrollment, getGroups } from "./actions/enrollmentAction";

interface EnrollmentState {
  loader: true | false;
  groupLoader: true | false;
  enrollment: [];
  courses: [];
  groups: [];
  drivers: [];
}
const initialState: EnrollmentState = {
  loader: false,
  groupLoader: false,
  enrollment: [],
  courses: [],
  groups: [],
  drivers: [],
};

export const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get getEnrollment methods
    builder.addCase(getEnrollment.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getEnrollment.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getEnrollment.fulfilled, (state: any, { payload }) => {
      state.loader = false;
      state.enrollment = payload;
    });
    // Get getCourses methods
    builder.addCase(getCourses.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getCourses.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getCourses.fulfilled, (state: any, { payload }) => {
      state.loader = false;
      state.courses = payload;
    });
    // Get getGroups methods
    builder.addCase(getGroups.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getGroups.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(getGroups.fulfilled, (state: any, { payload }: any) => {
      state.loader = false;
      state.groups = payload?.items;
    });
    // Get getDriversById methods
    builder.addCase(getDriversById.pending, (state) => {
      state.groupLoader = true;
    });
    builder.addCase(getDriversById.rejected, (state) => {
      state.groupLoader = false;
    });
    builder.addCase(getDriversById.fulfilled, (state: any, { payload }: any) => {
      state.groupLoader = false;
      state.drivers = payload?.items;
    });
  },
});

export const {} = enrollmentSlice.actions; // to Access Reducers methods

export const enrollmentLoader = (state: RootState) => state.enrollment.loader;
export const enrollmentList = (state: RootState) => state.enrollment.enrollment;
export const coursesRec = (state: RootState) => state.enrollment.courses;
export const groupList = (state: RootState) => state.enrollment.groups;
export const driverList = (state: RootState) => state.enrollment.drivers;
export const groupLoader = (state: RootState) => state.enrollment.groupLoader;
