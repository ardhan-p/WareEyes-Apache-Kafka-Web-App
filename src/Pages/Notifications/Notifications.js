import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "./Notifications.css";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function createData(msg, date, time) {
  return {
    msg,
    date,
    time,
  };
}

const rows = [
  createData('Dataset B passed threshold "550"', "2022-04-01", "16:23:17"),
  createData('Dataset E passed threshold "240"', "2022-04-21", "14:55:13"),
  createData('Dataset D passed threshold "150"', "2022-04-31", "14:34:14"),
  createData('Dataset C passed threshold "120"', "2022-04-01", "13:23:06"),
  createData('Dataset G passed threshold "100"', "2022-11-01", "01:26:16"),
  createData('Dataset A passed threshold "90"', "2022-12-05", "13:20:67"),
  createData('Dataset A passed threshold "30"', "2022-03-14", "13:59:46"),
  createData('Dataset Z passed threshold "180"', "2022-07-21", "12:40:06"),
  createData('Dataset Z passed threshold "230"', "2022-02-01", "11:30:46"),
  createData('Dataset L passed threshold "150"', "2022-04-30", "05:28:36"),
  createData('Dataset M passed threshold "20"', "2022-04-13", "06:25:26"),
  createData('Dataset N passed threshold "30"', "2022-05-05", "03:21:26"),
  createData('Dataset O passed threshold "90"', "2022-04-11", "00:20:26"),
  createData('Dataset A passed threshold "80"', "2022-12-05", "13:20:67"),
  createData('Dataset H passed threshold "70"', "2022-03-14", "13:59:46"),
  createData('Dataset A passed threshold "190"', "2022-07-21", "12:40:06"),
  createData('Dataset K passed threshold "230"', "2022-02-01", "11:30:46"),
  createData('Dataset L passed threshold "50"', "2022-04-30", "05:28:36"),
  createData('Dataset M passed threshold "40"', "2022-04-13", "06:25:26"),
  createData('Dataset N passed threshold "60"', "2022-05-05", "03:21:26"),
  createData('Dataset O passed threshold "30"', "2022-04-11", "00:20:26"),
  createData('Dataset H passed threshold "90"', "2022-12-05", "13:20:67"),
  createData('Dataset B passed threshold "30"', "2022-03-14", "13:59:46"),
  createData('Dataset D passed threshold "180"', "2022-07-21", "12:40:06"),
  createData('Dataset Y passed threshold "230"', "2022-02-01", "11:30:46"),
  createData('Dataset L passed threshold "100"', "2022-04-30", "05:28:36"),
  createData('Dataset M passed threshold "120"', "2022-04-13", "06:25:26"),
  createData('Dataset N passed threshold "130"', "2022-05-05", "03:21:26"),
  createData('Dataset O passed threshold "80"', "2022-04-11", "00:20:26"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "msg",
    numeric: false,
    disablePadding: true,
    label: "Message",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className="log-box">
          <Checkbox
            className="log-box"
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all alert log",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className="log-box"
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className="log-box"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Alert Logs
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon className="log-box" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function Notifications() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.msg);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <div className="notification-log">
      <Sidebar />
      <div className="notification-container">
        <Navbar />
        <div className="notification-title">Notifications</div>
        <div className="notification-logs">
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }} className="log-box">
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 stableSort(rows, getComparator(order, orderBy)) */}
                    {rows
                      .slice()
                      .sort(getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.msg);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.msg)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.msg}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox" className="log-box">
                              <Checkbox
                                className="log-box"
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              className="log-box"
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.msg}
                            </TableCell>
                            <TableCell className="log-box" align="left">
                              {row.date}
                            </TableCell>
                            <TableCell className="log-box" align="left">
                              {row.time}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={3} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                className="log-box"
                rowsPerPageOptions={[10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
