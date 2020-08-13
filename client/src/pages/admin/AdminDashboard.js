import React from 'react';
import SideNav from '../../components/sidebar';
import { Button, Box } from '@material-ui/core';

export default function AdminDashboard(props) {
	return (
		<div>
			<div>
				<SideNav activeNav="Dashboard">
					<Box display="flex" justifyContent="space-between">
						<Box width="50%">
							admin Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
							facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
							rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
						</Box>
						<Box>
							<Button onClick={() => props.history.push('/scanBags')} color="primary" variant="outlined">
								Scan Bag
							</Button>
						</Box>
					</Box>
				</SideNav>
			</div>
		</div>
	);
}
