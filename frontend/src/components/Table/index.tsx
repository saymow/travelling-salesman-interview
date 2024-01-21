import { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { Box, Stack } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import SearchTextField from "./SearchTextField";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export type Row = Record<string, string | number>;

export interface Props {
  columns: Column[];
  rows: Row[];
  total: number;
  rowIdColumn: string;
  search?: {
    placeholder: string;
    onChange: (search: string) => void;
  };
  pagination?: {
    page: number;
    limit: number;
    onChange: (page: number, limit: number) => void;
  };
}

const SEARCH_DEBOUNCE_TIME_MS = 100;

const Table: React.FC<Props> = (props) => {
  const {
    columns,
    rows,
    pagination: paginationParams,
    search: searchParams,
    total,
    rowIdColumn,
  } = props;
  const [search, setSearch] = useState("");

  const updateSearch = useCallback(
    (newSearch: string) => {
      searchParams?.onChange(newSearch);
    },
    [searchParams?.onChange]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSearch(search);
    }, SEARCH_DEBOUNCE_TIME_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, updateSearch]);

  const handleChangePage = (_: unknown, newPage: number) => {
    paginationParams?.onChange(Math.max(newPage, 0), paginationParams.limit);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = +event.target.value;
    paginationParams?.onChange(0, newLimit);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      {searchParams && (
        <Stack direction="row-reverse">
          <Box sx={{ maxWidth: 360, width: "100%" }}>
            <SearchTextField
              placeholder={searchParams.placeholder}
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
        </Stack>
      )}
      <TableContainer>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row[rowIdColumn]}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {paginationParams && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={total}
          rowsPerPage={paginationParams.limit}
          page={paginationParams.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleLimitChange}
        />
      )}
    </Paper>
  );
};

export default Table;
