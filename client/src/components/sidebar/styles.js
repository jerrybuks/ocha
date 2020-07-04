
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: theme.typography.pxToRem(22),
        backgroundColor: theme.palette.common.white,
		color: theme.palette.primary.main,
		minHeight: 64,
    },
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	appBar: {
		minHeight: 64,
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
	list: {
		paddingTop: theme.spacing(3),
		paddingLeft: theme.spacing(2),
		color: theme.palette.common.white
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundImage: `linear-gradient(to left top,${theme.palette.primary.light},green)`,
		color: theme.palette.common.white,

	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
    },
    button: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3)
	},
	icon:{
		color: theme.palette.common.white
	},
	leftMarginSmall: {
		marginLeft: theme.spacing(1)
	},
    isActive: {
        color: theme.palette.active.dark
    }
}));

export const Accordion = withStyles({
	root: {
	  border: 'none',
	  boxShadow: 'none',
	  color: 'white',
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
  })(MuiAccordion);
  
  export const AccordionSummary = withStyles({
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
  })(MuiAccordionSummary);
  
  export const AccordionDetails = withStyles(theme => ({
	root: {
	  padding: '0 12px',
	},
  }))(MuiAccordionDetails)

   
