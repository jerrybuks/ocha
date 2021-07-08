import { firestore } from "../../firebase/firebase.utils";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SideNav from "../.././components/sidebar";
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

export default function PayBills({history}) {
  const classes = useStyles();
  const theme = useTheme()
  const user = useSelector((state) => state.user);
  const [state, setstate] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = firestore
        .collection("Bags")
        .where("userId", "==", user.currentUser.id);

      const documentSnapshots = await docRef.get();
      const data = [];
      documentSnapshots.forEach(function (doc) {
		  console.log(doc,1234)
        if (doc.exists) {
          data.push({ ...doc.data(), docId: doc.id });
        }
      });
	  console.log(data,34)
	  setstate(data);
	  setLoading(false);
    };
	fetchData();
  }, [user.currentUser.id]);

  console.log(state, 66677);

  return (
    <div>
      <SideNav activeNav="Pay Bills">

	  <TableContainer component={Paper}>
      {isLoading && <LinearProgress />}
      <Table className={classes.table} aria-label="simple table" style={{ filter : isLoading ? 'blur(5px)' : 'blur(0)' }}>
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
          
          {state.map((row,index) => (
            <TableRow key={row.BagId} style={{ backgroundColor : (index%2 !== 0) ? theme.palette.common.white : theme.palette.primary.veryLight }}>
              <TableCell component="th" scope="row" className={classes.tableBagIds} onClick={() => history.push({ pathname: `bags/${row.docId}`, data: row })}>
                {row.BagId}
              </TableCell>
              <TableCell align="right">{row.Billed}</TableCell>
              <TableCell align="right">{row.assStatus}</TableCell>
              <TableCell align="right">{formatDate(row.createdAt.toDate())}</TableCell>
              <TableCell align="right">{row.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
	  </SideNav>
    </div>
  );
}
