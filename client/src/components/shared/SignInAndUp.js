import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Card, FormControl, Input } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './SignInAndUp.css';
import GoogleButton from './common/GoogleButton';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'white',
		marginTop: theme.spacing(3),
		border: '1px solid #ffffff',
		margin: theme.spacing(4),

		'& .MuiTextField-root': {
			margin: theme.spacing(2)
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
	muiPaper: {
		background: 'var(--white-shade)'
	}
}));

export default function SignInAndUp({ location }) {
	const [ state, setstate ] = useState(location.state);
	const classes = useStyles();
	console.log(location.state);
	useEffect(
		() => {
			console.log('hello');
		},
		[ state ]
	);
	const handleClick = (value) => {
		setstate(value);
	};
	const isSignUp = state === 'signup';
	return (
		<div className="sign-container">
			<div className="sign-container__block">
				{!isSignUp ? (
					<div className="sign-container__block-info--left">
						<h3>Don't Have an account ?</h3>
						<p>make sure to play your path, in contributing to healthy enviroment</p>
						<Button
							variant="outlined"
							size="large"
							className={classes.root}
							onClick={() => handleClick('signup')}
						>
							sign Up
						</Button>
					</div>
				) : (
					<div className="sign-container__block-info--right">
						<div>
							<h3>Already Have an account ?</h3>
							<p>make sure to play your path, in contributing to healthy enviroment</p>
							<Button
								variant="outlined"
								size="large"
								className={classes.root}
								onClick={() => handleClick('signin')}
							>
								Log in
							</Button>
						</div>
					</div>
				)}
			</div>
			<SignUpForm isSignUp={isSignUp} action={isSignUp ? 'Sign Up' : 'Sign In'} />
		</div>
	);
}

const ValidationTextField = withStyles({
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
			width: '25rem'
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
			borderColor: '#green',
			padding: '4px !important' // override inline-style
		}
	}
})(TextField);

const SignUpForm = ({ isSignUp, action }) => {
	const classes = useStyles();
	const [ state, setState ] = React.useState({ name: '', email: '', passWord: '', showPassword: false });

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};
	const handleClickShowPassword = () => {
		setState({ ...state, showPassword: !state.showPassword });
	};
	const { name, email, passWord, showPassword } = state;
	let formStyle;
	!isSignUp
		? (formStyle = classes.muiPaper + ' form-card form-card--right')
		: (formStyle = classes.muiPaper + ' form-card form-card--left');

	return (
		<Card className={formStyle}>
			<div className="form-heading">
				<h1>{action}</h1>
			</div>
			<form className={classes.root} noValidate autoComplete="off">
				{isSignUp && (
					<div>
						<ValidationTextField
							className={classes.margin}
							name="name"
							label="Name"
							value={name}
							onChange={handleChange}
							type="text"
							required
							variant="outlined"
							defaultValue="Success"
						/>
					</div>
				)}
				<div>
					<ValidationTextField
						className={classes.margin}
						name="email"
						label="Email"
						value={email}
						onChange={handleChange}
						type="email"
						required
						variant="outlined"
						defaultValue="Success"
					/>
				</div>
				<div className="password-container">
					<div className="password-container__container">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							edge="end"
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</div>

					<ValidationTextField
						className={classes.margin}
						name="passWord"
						label="password"
						value={passWord}
						onChange={handleChange}
						type={showPassword ? 'text' : 'password'}
						required
						variant="outlined"
						defaultValue="Success"
					/>
				</div>
				<div className="flex-centerHor mg-top-big">
					<div className="mg-rt-small">
						<GoogleButton view={action} />
					</div>
					<Button variant="contained" size="large">
						{action}
					</Button>
				</div>
			</form>
		</Card>
	);
};
