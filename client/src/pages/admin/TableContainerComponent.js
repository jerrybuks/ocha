import React from 'react';
import useFirebasePagination from '../../custom-hooks/useFirebasePagination';
import TablePresentationalComponent from './TablePresentationalComponent';
import { Box } from '@material-ui/core';

export default function TableContainerComponent({ numOfDocs }) {
	const itemsPerPage = 10;
	const totalNoOfPages = Math.ceil(numOfDocs / itemsPerPage);

	const [ queryState, getNextPage, getPrevPage ] = useFirebasePagination(numOfDocs, itemsPerPage, totalNoOfPages);

	return (
		<div>
			<Box display="flex" justifyContent="center" mb={3}>
				Listings:{' '}
				<Box fontWeight="fontWeightBold">
					{queryState.curListStart} to {queryState.curListEnd}
				</Box>{' '}
				<Box mx={0.5}> of </Box>
                <Box fontWeight="fontWeightBold">{queryState.totalItemsCount}</Box>
			</Box>
			<TablePresentationalComponent {...queryState} getNextPage={getNextPage} getPrevPage={getPrevPage} />
		</div>
	);
}
