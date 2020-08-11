import React from 'react';
import { connect } from 'react-redux';
import Sidenav from '../../components/sidebar';
import { Button, Box, CircularProgress } from '@material-ui/core';
import { generateBagStart } from '../../redux/bag/bag.actions';
import { selectIsGeneratingBag } from '../../redux/bag/bag.selector';
import { createStructuredSelector } from 'reselect';
import BagsTable from './BagsTable';

function Bags({ generateBagStart, isGenerating }) {
	
	return (
		<div>
			<Sidenav activeNav="Bags">
				<Box display="flex" justifyContent="flex-end">
					<Button onClick={generateBagStart} color="primary" variant="outlined" disabled={isGenerating}>
						Generate Bag {isGenerating && <CircularProgress color="primary" size={15} />}{' '}
					</Button>
				</Box>
				<BagsTable />
                
			</Sidenav>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	generateBagStart: () => dispatch(generateBagStart())
});

const mapStateToProps = createStructuredSelector({
	isGenerating: selectIsGeneratingBag
});

export default connect(mapStateToProps, mapDispatchToProps)(Bags);
