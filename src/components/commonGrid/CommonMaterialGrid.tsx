import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
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
}

const CommonMaterialGrid = ({
  columns,
  rows,
  height,
  defaultPerPageRecord,
  loader = false,
  deletedRow = false,
  hideFooter = true,
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
          enableRowSelection={false}
          initialState={{ density: "compact" }}
          enableStickyHeader
          enableFullScreenToggle={false}
          enablePagination={hideFooter}
          // initialState={{ showColumnFilters: true }}
          state={{ isLoading: loader }}
          muiTableContainerProps={{
            sx: { height: height },
          }}
          renderEmptyRowsFallback={() => emptyMessage}
          muiTableBodyCellProps={muiTableBodyCellProps}
          muiTableHeadCellProps={{
            sx: (theme) => ({
              background: "black",
              // borderRight: "white",
              color: "white",
            }),
          }}
        />
      </Box>
    </div>
  );
};

export default CommonMaterialGrid;
