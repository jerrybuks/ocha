import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import GavelIcon from '@material-ui/icons/Gavel';
import WithDrawerContent from './WithDrawerContent';

export default function AdminContent({active}) {
    const adminNav = [
		{ text: 'Dashboard', path: 'dashboard', icon: <DashboardIcon /> },
		{ text: 'Check Recyclability', path: 'checkRecyclability', icon: <DeleteSweepIcon /> },
		{ text: 'Regulation', path: 'regulation', icon: <GavelIcon /> }
		// { text: 'Report', path: 'report', icon: <ReportIcon /> }
	];
    return (
        <div>
           <WithDrawerContent navigation={adminNav} active={active} /> 
        </div>
    )
}
