import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCourses, getEnrollment } from "./actions/enrollmentAction";

interface EnrollmentState {
  loader: true | false;
  enrollment: [];
  courses: [];
}
const initialState: EnrollmentState = {
  loader: false,
  enrollment: [],
  courses: [],
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
  },
});

export const {} = enrollmentSlice.actions; // to Access Reducers methods

export const enrollmentLoader = (state: RootState) => state.enrollment.loader;
export const enrollmentList = (state: RootState) => state.enrollment.enrollment;
export const coursesRec = (state: RootState) => state.enrollment.courses;
