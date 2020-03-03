import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, withStyles  } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PaymentIcon from '@material-ui/icons/Payment';
import PrintIcon from '@material-ui/icons/Print';
import ShopIcon from '@material-ui/icons/Shop';
import GavelIcon from '@material-ui/icons/Gavel';
// import ReportIcon from '@material-ui/icons/Report';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';

import './SideNav.css';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		backgroundImage: "linear-gradient(to right bottom,rgba(40, 168, 70, 0.9),rgba(0,0,0, 0.7))",
		color: 'var(--white-color)'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

const ExpansionPanel = withStyles({
	root: {
	  border: 'none',
	  boxShadow: 'none',
	  color: 'var(--white-color)',
	  backgroundColor: 'transparent',
	  '&:not(:last-child)': {
		borderBottom: 0,
	  },
	  '&:before': {
		display: 'none',
	  },
	  '&$expanded': {
		margin: 'auto',
	  },
	},
	expanded: {},
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
	root: {
	  backgroundColor: 'transparent',
	  marginBottom: -1,
	  padding: 0,
	  minHeight: 12,
	  '&$expanded': {
		minHeight: 12,
		
	  },
	},
	content: {
	  '&$expanded': {
		margin: '2px 0',
		padding: '0'
	  },
	},
	expanded: {},
  })(MuiExpansionPanelSummary);
  
  const ExpansionPanelDetails = withStyles(theme => ({
	root: {
	  padding: '0 12px',
	},
  }))(MuiExpansionPanelDetails)

const SideNav = withRouter((props) => <SideNavComponent {...props} />);

function SideNavComponent(props) {
	const { activeNav } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	console.log(props.history);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

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
			props.history.push(path);
		}
		
	};
	const drawer = (
		<div>
			<div className={classes.toolbar + ' header-logo'} >
				<div>
				ocha
				</div>
			</div>
			<Divider />
			<List>
				{navigation.map(({ text, path, icon, isExpandable, childIcon }, index) => (
					<ListItem button key={text} onClick={() => handleClick(path, isExpandable)}>
						
						{!isExpandable ? <>
							<span className={activeNav === text ? 'pd-vsmall isActive' : 'pd-vsmall'}>{icon}</span>
							<ListItemText primary={text} />
						</> : <ExpansionPanel >
								
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon className="text-white"/>}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>	
									<span className="pd-vsmall">{icon}</span>
									<div className="mg-top-small"><ListItemText primary={text} /></div>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
								<List>
									{childIcon.map(({text,icon,path}) => (
										<>
										
											<ListItem button key={text} onClick={() => handleClick(path)}>
											<span className={activeNav === text ? 'pd-vsmall isActive' : 'pd-vsmall'}>{icon}</span>
												<ListItemText primary={text} />
											</ListItem>
										
										</>
									))}
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						}

					</ListItem>
				))}
				{/* <Button >Log out</Button> */}
				<div className="sign-out"> 
					<Button variant="contained" size="small" >Log out</Button>	
				</div>
			</List>
		</div>
	);
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar} color="transparent">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{activeNav}
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Typography paragraph>{props.children}</Typography>
			</main>
		</div>
	);
}

SideNav.propTypes = {
	/**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  activeNav: PropTypes.string
};

export default SideNav;
