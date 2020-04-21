import React, { useState, useEffect } from 'react';
import { Button, Card, Box, Link, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidationTextField, useStyles } from './styles';

import GoogleButton from '../googleButton';

export default function SignInAndUp({ location, history }) {
	const [ action, setAction ] = useState(location.state);
	const [ state, setState ] = useState({ name: '', email: '', passWord: '', showPassword: false });
	const classes = useStyles();
	console.log(location.state);
	useEffect(
		() => {
			console.log('hello');
		},
		[ state ]
	);
	const handleClick = (value) => {
		setAction(value);
	};

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};
	const handleClickShowPassword = () => {
		setState({ ...state, showPassword: !state.showPassword });
	};
	const { name, email, passWord, showPassword } = state;
	const isSignUp = action === 'sign up';
	return (
		<div className={classes.signContainer}>
			<Box p={3} fontSize="h5.fontSize" className={classes.pointerCursor} onClick={() => history.push('/')}>
				ocha
			</Box>
			<div className={classes.form}>
			<Card className={classes.formCard}>
				<div className={classes.formHeading}>
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
						/>
					</div>
					<div className={classes.passwordContainer}>
						<div className={classes.password}>
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
						/>
					</div>
					<Box display="flex" mt={2} mb={4}>
						<Box mr={2}>
							<GoogleButton view={action} />
						</Box>
						<Button variant="contained" size="large">
							{action}
						</Button>
					</Box>
					<Box>
						{!isSignUp ? (
							<Typography variant="subtitle1">
								Dont have an account?{' '}
								<Link  variant="body2" onClick={() => handleClick('sign up')} className={classes.pointerCursor}>
									sign up
								</Link>
							</Typography>
						) : (
							<Typography>
								Already have an account?{' '}	
								<Link  variant="body2" onClick={() => handleClick('sign in')} className={classes.pointerCursor}>
									sign in
								</Link>
							</Typography>
						)}
					</Box>
				</form>
			</Card>
			</div>
		</div>
	);
}
