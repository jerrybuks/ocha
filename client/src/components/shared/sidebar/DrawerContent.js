import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PaymentIcon from '@material-ui/icons/Payment';
import PrintIcon from '@material-ui/icons/Print';
import ShopIcon from '@material-ui/icons/Shop';
import GavelIcon from '@material-ui/icons/Gavel';
// import ReportIcon from '@material-ui/icons/Report';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';

import {ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,useStyles} from'./styles.js';

const DrawerContent = withRouter((props => <DrawerContentComp {...props} />))

 function DrawerContentComp({active, history}) {
    const classes  = useStyles()

    let navigation = [
		{ text: 'Dashboard', path: 'dashboard', icon: <DashboardIcon /> },
		{ text: 'Pay Bills', path: 'payBills', icon: <PaymentIcon /> },
		{ text: 'Print Barcode', path: 'printBarcode', icon: <PrintIcon /> },
		{ text: 'Exchange Room', path: 'exchangeRoom', icon: <ShopIcon />, isExpandable: true, childIcon: [{ text: "Offer",path: 'offer', icon: <StoreIcon /> }, { text: "Redeem", path: 'redeem', icon: <ShoppingCartIcon /> }] },
		{ text: 'Check Recyclability', path: 'checkRecyclability', icon: <DeleteSweepIcon /> },
		{ text: 'Regulation', path: 'regulation', icon: <GavelIcon /> },
		// { text: 'Report', path: 'report', icon: <ReportIcon /> }
    ];

    const handleClick = (path, isExpand) => {
		if (!isExpand) {
			history.push(path);
		}
		
	};
    
    return (
        <div>
        <div className={classes.toolbar} >
            <div className={ classes.logo}>
            ocha
            </div>
        </div>
        <Divider />
        <List className={classes.list}>
            {navigation.map(({ text, path, icon, isExpandable, childIcon }, index) => (
                <ListItem button key={text} onClick={() => handleClick(path, isExpandable)}>
                    
                    {!isExpandable ? <>
                        <span className={active === text ? classes.isActive : ''}>{icon}</span>
                        <ListItemText primary={text} className={classes.leftMarginSmall}/>
                    </> : <ExpansionPanel >
                            
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon className={classes.icon}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >	
                                <span >{icon}</span>
                                <div ><ListItemText primary={text} className={classes.leftMarginSmall}/></div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <List >
                                {childIcon.map(({text,icon,path}) => (
                                    <div key={text}>
                                    
                                        <ListItem button key={text} onClick={() => handleClick(path)}>
                                        <span className={active === text ? classes.isActive : ''}>{icon}</span>
                                            <ListItemText primary={text} className={classes.leftMarginSmall}/>
                                        </ListItem>
                                    
                                    </div>
                                ))}
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    }

                </ListItem>
            ))}
            <div className={classes.button}> 
                <Button variant="contained" size="small" >Log out</Button>	
            </div>
        </List>
    </div>
    )
}
DrawerContent.propTypes = {
    active: PropTypes.string
}
export default DrawerContent;