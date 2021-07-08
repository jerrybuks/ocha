import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import formatDate from "../../utils/formatDate";
import Pagination from "../../components/pagination"

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    fontWeight: "bold"
  },
  tableBagIds: {
    color: theme.palette.primary.dark,
    cursor: 'pointer'
  }
}));


function TablePresentationalComponent({isGettingTableData, curData : rows, hasNextPage, hasPrevPage,  getNextPage, getPrevPage, curPage, totalNumOfPages, history}) {
  const classes = useStyles();
  const theme = useTheme()
  return (
    <TableContainer component={Paper}>
      {isGettingTableData && <LinearProgress />}
      <Table className={classes.table} aria-label="simple table" style={{ filter : isGettingTableData ? 'blur(5px)' : 'blur(0)' }}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Bag Id's</TableCell>
            <TableCell align="right" className={classes.tableHeader}>Billed</TableCell>
            <TableCell align="right" className={classes.tableHeader}>Ass Status</TableCell>
            <TableCell align="right" className={classes.tableHeader}>createdAt</TableCell>
            <TableCell align="right" className={classes.tableHeader}>payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {rows.map((row,index) => (
            <TableRow key={row.BagId} style={{ backgroundColor : (index%2 !== 0) ? theme.palette.common.white : theme.palette.primary.veryLight }}>
              <TableCell component="th" scope="row" className={classes.tableBagIds} onClick={() => history.push({ pathname: `bags/${row.docId}`, data: row })}>
                {row.BagId}
              </TableCell>
              <TableCell align="right">{row.Billed ? "true" : "false"}</TableCell>
              <TableCell align="right">{row.assStatus}</TableCell>
              <TableCell align="right">{formatDate(row.createdAt.toDate())}</TableCell>
              <TableCell align="right">{row.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination {...{hasNextPage, hasPrevPage, getNextPage, getPrevPage, curPage, totalNumOfPages}}/>
      
    </TableContainer>
  );
}


export default  withRouter(TablePresentationalComponent)