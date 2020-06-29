
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import bck from '../../.././assets/signIn-bck.jpg'
export const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.common.black,
		marginTop: theme.spacing(3),
		border: '1px solid #ffffff',
		margin: theme.spacing(4),

		'& .MuiTextField-root': {
			margin: theme.spacing(2),
			width: '85%',
			// width: 200
		},
		'& .MuiButton-contained': {
			background: '#28a745',
			color: 'white'
		}
	},
	extendedIcon: {
		marginRight: theme.spacing(1)
	},
    signContainer: {
        backgroundImage: `linear-gradient(to right bottom,${theme.palette.primary.light},rgba(0, 0, 0, 0.49)),url(${bck})`,
        maxHeight: '100vh',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: theme.palette.common.white,
        
    },
    form:{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        left: '50%',
        top:' 50%',
        transform: 'translate(-50%, -50%)'
    },
    formCard:{
        backgroundColor: theme.palette.common.floralWhite,
        textAlign: 'center'
    },
    formHeading: {
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
    passwordContainer:{
        position: 'relative'
    },
    password:{
        position: 'absolute',
        zIndex: 1,
        right: '15%',
        top: '22%'
    },
    pointerCursor: {
        cursor: 'pointer'
    },
    '@keyframes moveInLeft': {
    '0%': {
        opacity: 0,
        transform: 'translateX(-10rem)'
    },
    '80%':{
        transform: 'translateX(1rem)'
    },
    '100%': {
        opacity: 1,
        transform:'translate(0)'
    }
},
'@keyframes moveInRight': {
    '0%': {
        opacity: 0,
        transform: 'translateX(10rem)'
    },
    '80%':{
        transform: 'translateX(-1rem)'
    },
    '100%': {
        opacity: 1,
        transform:'translate(0)'
    }
},
}));


export  const ValidationTextField = withStyles({
	root: {
		// '& input:valid + fieldset': {
		// 	borderColor: '#635632',
		// 	borderWidth: 2
		// },
		// '& input:invalid + fieldset': {
		// 	borderColor: 'red',
		// 	borderWidth: 2
		// },

		'& .MuiInputBase-input': {
			// width: '25rem'
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
			borderColor: '#green',
			padding: '4px !important' // override inline-style
		}
	}
})(TextField);

