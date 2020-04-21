import { makeStyles  } from '@material-ui/core/styles';


 export const useStyles = makeStyles((theme) => ({
 	root: {
     display: 'flex',
     backgroundColor: theme.palette.cyanBlue,
     cursor: 'pointer',
     boxShadow: `0 0 2px ${theme.palette.cyanBlue}`,
     '&:hover':{
      boxShadow: `0 0 6px ${theme.palette.cyanBlue}`
     },
     '&:active':{
      background: '#1669F2'
     }
  },
   logoWrapper: {
     display: 'flex',
     justifyContent: 'center',
     width: 40,
     height: 'inherit',
     borderRadius: 2,
     backgroundColor: theme.palette.common.white,
   },
   logo: {
     width: 20
   },
   btnText: {
    letterSpacing: theme.typography.pxToRem(0.2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.common.white,
  },

 }));


