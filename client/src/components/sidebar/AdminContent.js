import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import GavelIcon from '@material-ui/icons/Gavel';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import ScannerIcon from '@material-ui/icons/Scanner';
import WithDrawerContent from './WithDrawerContent';

export default function AdminContent({active}) {
    const adminNav = [
        { text: 'Dashboard', path: 'dashboard', icon: <DashboardIcon /> },
        { text: 'Scan Bags', path: 'scanBags', icon: <ScannerIcon /> },
        { text: 'Bags', path: 'bags', icon: <LocalMallOutlinedIcon /> },
		{ text: 'Districts', path: 'districts', icon: <GavelIcon /> },
		{ text: 'Marketplace', path: 'marketPlace', icon: <DeleteSweepIcon /> },
		// { text: 'Report', path: 'report', icon: <ReportIcon /> }
	];
    return (
        <div>
           <WithDrawerContent navigation={adminNav} active={active} /> 
        </div>
    )
}
