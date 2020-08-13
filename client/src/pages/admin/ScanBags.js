import React from 'react';
import SideNav from '../../components/sidebar';
import { Button, Box } from '@material-ui/core';
import QrCodeScanner from '../../components/qr-code-reader';

export default function ScanBags(props) {
	return (
		<div>
			<div>
				<SideNav activeNav="Scan Bags">
					<QrCodeScanner btnText="Bill User"/>
				</SideNav>
			</div>
		</div>
	);
}
