import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PaymentIcon from '@material-ui/icons/Payment';
import PrintIcon from '@material-ui/icons/Print';
import ShopIcon from '@material-ui/icons/Shop';
import GavelIcon from '@material-ui/icons/Gavel';
// import ReportIcon from '@material-ui/icons/Report';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';

import WithDrawerContent from './WithDrawerContent';

export default function UserContent({active}) {
	const userNav = [
		{ text: 'Dashboard', path: 'dashboard', icon: <DashboardIcon /> },
		{ text: 'Pay Bills', path: 'payBills', icon: <PaymentIcon /> },
		{ text: 'Print Barcode', path: 'printBarcode', icon: <PrintIcon /> },
		{
			text: 'Exchange Room',
			path: 'exchangeRoom',
			icon: <ShopIcon />,
			isExpandable: true,
			childIcon: [
				{ text: 'Offer', path: 'offer', icon: <StoreIcon /> },
				{ text: 'Redeem', path: 'redeem', icon: <ShoppingCartIcon /> }
			]
		},
		{ text: 'Check Recyclability', path: 'checkRecyclability', icon: <DeleteSweepIcon /> },
		{ text: 'Regulation', path: 'regulation', icon: <GavelIcon /> }
		// { text: 'Report', path: 'report', icon: <ReportIcon /> }
	];
	return (
		<div>
			<WithDrawerContent navigation={userNav} active={active}/>
		</div>
	);
}
