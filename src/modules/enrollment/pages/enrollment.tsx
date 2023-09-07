
import React, { useEffect, useMemo, useState } from "react";

import { columns } from "./components/columns";
import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import { EnrollmentRoute } from "../enrollment.routes";
import { GridRowModel } from "@mui/x-data-grid";
import CommonDataGridPage from "../../../components/commonDataGridPage/CommonDataGridPage";
import CommonMaterialGrid from "../../../components/commonGrid/CommonMaterialGrid";
import {
  getCourses,
  getEnrollment,
  getGroups,
} from "../../../app-redux/enrollment/actions/enrollmentAction";
import { useAppSelector } from "../../../app-redux/hooks";
import { enrollmentList, enrollmentLoader } from "../../../app-redux/enrollment/enrollmentSlice";
import { EnrollmentFilters } from "./components/filters";
import { Grid } from "@mui/material";
import { EnrollmentGroups } from "./components/groups";

const rows: any = [
  {
    id: "153",
    courses: "(PC) Backing Up When Leaving 1 - Backing Up Lesson	",
    status: "backlog",
    assigned: "2023-08-15T00:32:03.993Z	",
    enrolled: "true",
    completed: "N/A	",
    driver: "MAURCEL GOODMAN	",
    group: "group 2, group 2, group 2",
  },
  {
    id: "213",
    courses: "(PC) Backing Up When Leaving 1 - Backing Up Lesson	",
    status: "backlog",
    assigned: "2023-08-15T00:32:03.993Z	",
    enrolled: "true",
    completed: "N/A	",
    driver: "MAURCEL GOODMAN	",
    group: "group 2, group 1 ",
  },
  {
    id: "33",
    courses: "(PC) Backing Up When Leaving 1 - Backing Up Lesson	",
    status: "backlog",
    assigned: "2023-08-15T00:32:03.993Z	",
    enrolled: "true",
    completed: "N/A	",
    driver: "MAURCEL GOODMAN	",
    group: "group 3",
  },
];

export function Enrollment() {
  const dispatch = useDispatch();
  const loader: boolean = useAppSelector(enrollmentLoader);
  const enrollmentRecord: any = useAppSelector(enrollmentList);

  const moduleName = EnrollmentRoute.title;
  const pageHeading = EnrollmentRoute.subRoutes ? EnrollmentRoute.subRoutes[0].title : "Page Title";
  const pageSize = 10;
  const [displayColumns, setDisplayColumns] = React.useState<any>(columns);
  const [gridRecord, setGridRecord] = React.useState<GridRowModel[]>([]);
  const [pagination, setPagination] = useState({
    take: 10,
    skip: 0,
  });
  const [status, setStatus] = useState("");

  const [apiParams, setApiParams] = useState({
    take: 10,
    skip: 0,
    status: "",
    course: "",
    driver: "",
  });

  const getGridList = useMemo(async () => {
    const list: [] =
      (await enrollmentRecord) &&
      enrollmentRecord?.items?.map((record: any) => {
        const group = record.driver.groups.map((group: any) => group.group.name).join(", ");
        return {
          courses: record.course.name,
          status: record.status,
          assigned: record.createdDate,
          enrolled: record.createdDate,
          completed: record.completedDate == null ? "N/A" : record.completedDate,
          driver: record.driver.name,
          group: group,
        };
      });

    list && setGridRecord(list);
    return list;
  }, [enrollmentRecord]);

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getGroups());
  }, []);

  useEffect(() => {
    dispatch(getEnrollment(apiParams));
  }, [apiParams]);

  const rowSelectionHandler = (row: any) => {
    // console.log("row", row);
  };

  const paginationHandler = (pagination: any) => {
    setApiParams({ ...apiParams, take: pagination.pageSize, skip: pagination.pageIndex });
  };

  const statusHandler = (status: any) => {
    setApiParams({ ...apiParams, status: status });
  };

  const courceHandler = (course: any) => {
    setApiParams({ ...apiParams, course: course });
  };

  const driverhandler = (driver: any) => {
    setApiParams({ ...apiParams, driver: driver });
  };

  const behaviourHandler = (behaviour: any) => {
    //
  };

  return (
    <>
      <CommonDataGridPage
        module={moduleName}
        heading={pageHeading}
        GridDataComp={
          <Grid container direction="row" justifyContent="center" alignItems="flex-start">
            <Grid item xs={2}>
              <EnrollmentGroups driverhandler={driverhandler} />
            </Grid>
            <Grid item xs={10}>
              <CommonMaterialGrid
                rows={gridRecord}
                columns={displayColumns}
                defaultPerPageRecord={pageSize}
                loader={loader}
                height={450}
                enableRowSelection={true}
                rowSelectionHandler={rowSelectionHandler}
                rowCount={enrollmentRecord?.total}
                paginationHandler={paginationHandler}
              />
            </Grid>
          </Grid>
        }
      >
        <EnrollmentFilters
          statusHandler={statusHandler}
          courceHandler={courceHandler}
          behaviourHandler={behaviourHandler}
        />
      </CommonDataGridPage>
    </>
  );
}
