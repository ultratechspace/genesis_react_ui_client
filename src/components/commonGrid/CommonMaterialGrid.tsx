import React, { useEffect, useMemo, useState } from "react";
import { MRT_PaginationState, MaterialReactTable } from "material-react-table";
import { Box } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  columns: any;
  rows?: any;
  height?: number;
  loader?: boolean;
  defaultPerPageRecord?: number;
  deletedRow?: boolean;
  hideFooter?: boolean;
  enableRowSelection?: boolean;
  rowSelectionHandler?: any;
  rowCount?: any;
  paginationHandler?: any;
}

const CommonMaterialGrid = ({
  columns,
  rows,
  height,
  defaultPerPageRecord,
  loader = false,
  deletedRow = false,
  hideFooter = true,
  enableRowSelection = false,
  rowSelectionHandler,
  rowCount,
  paginationHandler,
}: Props) => {
  const classes = useStyles();
  const emptyMessage = useMemo(() => {
    return <div className={classes.label}>No results found</div>;
  }, []);

  const muiTableBodyCellProps = (row: any) => {
    return {
      sx: deletedRow && row.row.original.isDeleted ? { color: "red" } : {},
    };
  };

  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    rowSelectionHandler(rowSelection);
  }, [rowSelection]);

  useEffect(() => {
    paginationHandler(pagination);
  }, [pagination]);

  return (
    <div className={classes.root}>
      <Box style={{ width: "100%", height: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={rows}
          enableColumnFilterModes
          enableColumnOrdering={true}
          enableGrouping
          enablePinning
          enableRowActions={false}
          enableColumnResizing
          initialState={{ density: "compact" }} // comfortable
          enableStickyHeader
          enableFullScreenToggle={false}
          enablePagination={hideFooter}
          // initialState={{ showColumnFilters: true }}
          manualPagination
          onPaginationChange={setPagination}
          rowCount={rowCount}
          enableRowSelection={enableRowSelection}
          state={{ isLoading: loader, rowSelection, pagination }}
          getRowId={(row: any) => row.id}
          onRowSelectionChange={setRowSelection}
          muiTableContainerProps={{
            sx: { height: height },
          }}
          renderEmptyRowsFallback={() => emptyMessage}
          muiTableBodyCellProps={muiTableBodyCellProps}
          // muiTableHeadCellProps={{
          //   sx: (theme) => ({
          //     background: "black",
          //     // borderRight: "white",
          //     color: "white",
          //   }),
          // }}
        />
      </Box>
    </div>
  );
};

export default CommonMaterialGrid;
