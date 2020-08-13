import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		// alignItems: 'center',
		justifyContent: 'center',
		alignItems: 'start',
		marginTop: theme.spacing(10)
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 2),
		borderRadius: '.5em',
		outline: 'none'
	}
}));

export default function TransitionsModal(props) {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{props.children(handleOpen)}
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Box textAlign="right" onClick={handleClose}>
							<CloseIcon />
						</Box>
						{props.render(handleClose)}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
