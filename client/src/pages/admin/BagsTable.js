import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TableContainerComponent from './TableContainerComponent';
import { Box, CircularProgress } from '@material-ui/core';
import { getNumOfBagsStart } from '../../redux/bag/bag.actions';
import { selectIsFetchingNumOfDocs, selectNumOfDocs } from '../../redux/bag/bag.selector';
import { createStructuredSelector } from 'reselect';

function BagsTable({ getNumOfBagsStart, isFetchingNumOfDocs, numOfDocs }) {
	useEffect(() => {
		if (numOfDocs === 0) {
			getNumOfBagsStart();
		}
	}, []);

	return (
		<div>
			{isFetchingNumOfDocs ? (
				<Box> <CircularProgress /></Box>
			) : numOfDocs > 0 ? (
				<TableContainerComponent {...{ numOfDocs }} />
			) : (
				<Box>'No Document found'</Box>
			)}
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	getNumOfBagsStart: () => dispatch(getNumOfBagsStart())
});

const mapStateToProps = createStructuredSelector({
	isFetchingNumOfDocs: selectIsFetchingNumOfDocs,
	numOfDocs: selectNumOfDocs
});

export default connect(mapStateToProps, mapDispatchToProps)(BagsTable);
