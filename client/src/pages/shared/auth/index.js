import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Box, Link, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import GoogleButton from '../../../components/googleButton';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser, selectIsFetchingUser } from '../../../redux/user/user.selectors';
import { checkUserSession } from '../../../redux/user/user.actions';

import { googleSignInStart, emailSignInStart, signUpStart } from '../../../redux/user/user.actions';

import { ValidationTextField, useStyles } from './styles';
import Spinner from '../../../components/spinner/Spinner';

function SignInAndUp({
	location,
	history,
	checkUserSession,
	currentUser,
	isFetchingUser,
	emailSignInStart,
	googleSignInStart,
	signUpStart
}) {
	const [ action, setAction ] = useState(location.state);
	const [ state, setState ] = useState({ name: '', email: '', password: '', showPassword: false });
	const classes = useStyles();
	const formRef = React.useRef();
	useEffect(
		() => {
			checkUserSession();
			if (currentUser) {
				history.push('/dashboard');
			}
		},
		// eslint-disable-next-line
		[ currentUser ]
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
	const handleSignInAndUp = (e) => {
		if (formRef.current.reportValidity()) {
			const { name, email, password } = state;
			isSignUp ? signUpStart({ name, email, password }) : emailSignInStart(email, password);
		}
	};
	const { name, email, password, showPassword } = state;
	const isSignUp = action === 'sign up';
	return (
		<div className={classes.signContainer}>
			{isFetchingUser ? (
				<Spinner />
			) : (
				<div>
					<Box
						p={3}
						fontSize="h5.fontSize"
						className={classes.pointerCursor}
						onClick={() => history.push('/')}
					>
						ocha
					</Box>
					<div className={classes.form}>
						<Card className={classes.formCard}>
							<div className={classes.formHeading}>
								<h1>{action || 'sign in'}</h1>
							</div>
							<form className={classes.root} autoComplete="off" ref={formRef}>
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
										name="password"
										label="password"
										value={password}
										onChange={handleChange}
										type={showPassword ? 'text' : 'password'}
										required
										variant="outlined"
									/>
								</div>
								<Box display="flex" mt={2} mb={4}>
									<Box mr={2}>
										<GoogleButton view={action || 'sign in'} onClick={googleSignInStart} />
									</Box>
									<Button variant="contained" size="large" onClick={handleSignInAndUp}>
										{action || 'sign in'}
									</Button>
								</Box>
								<Box>
									{!isSignUp ? (
										<Typography variant="subtitle1">
											Dont have an account?{' '}
											<Link
												variant="body2"
												onClick={() => handleClick('sign up')}
												className={classes.pointerCursor}
											>
												sign up
											</Link>
										</Typography>
									) : (
										<Typography>
											Already have an account?{' '}
											<Link
												variant="body2"
												onClick={() => handleClick('sign in')}
												className={classes.pointerCursor}
											>
												sign in
											</Link>
										</Typography>
									)}
								</Box>
							</form>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	isFetchingUser: selectIsFetchingUser
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInAndUp);
