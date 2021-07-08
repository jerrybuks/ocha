import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    fontWeight: "bold",
  },
  tableBagIds: {
    color: theme.palette.primary.dark,
    cursor: "pointer",
  },
}));

export default function PickupTable({ isGettingTableData, rows }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Table
        className={classes.table}
        aria-label="simple table"
        style={{ filter: isGettingTableData ? "blur(5px)" : "blur(0)" }}
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>
              District's Name
            </TableCell>
            <TableCell align="right" className={classes.tableHeader}>
              Pickup Date
            </TableCell>
            <TableCell align="right" className={classes.tableHeader}>
              Collected
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor:
                  index % 2 !== 0
                    ? theme.palette.common.white
                    : theme.palette.primary.veryLight,
              }}
            >
              <TableCell >{row.districtName}</TableCell>
              <TableCell align="right">{moment(row.dateAndTime).format('LLL')}</TableCell>
              <TableCell align="right">{row.collected? "YES" : "NO"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
