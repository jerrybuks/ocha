import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import notFound from './assets/pageNotFound.svg';

function NoMatch(props) {
    console.log(props.history)
	return (
		<div>
			<Box display="flex" justifyContent="center" pt="12rem">
				<Box textAlign="center">
					<img src={notFound} alt="not found" height="25%" />
					<Box component="h3" whiteSpace="normal">
                        Look's like you're lost
					</Box>
					<Box component="div" display="block" mb="1rem">
						The page you are looking for was not found!
					</Box>
                    <Box display="inline-block" mr="10px">
                        <Button variant="contained" onClick={() => props.history.goBack()}>go back</Button>
                    </Box>
                    <Button variant="contained" color="primary" onClick={() => props.history.push('/')}>go to home</Button>
				</Box>
			</Box>
		</div>
	);
}

export default withRouter(NoMatch)
