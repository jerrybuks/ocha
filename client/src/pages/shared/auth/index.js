import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import { createStructuredSelector } from 'reselect';

import { selectCurrentUser, selectIsFetchingUser } from '../../../redux/user/user.selectors';
import { googleSignInStart, emailSignInStart, signUpStart } from '../../../redux/user/user.actions';
import AuthForm from '../../../components/auth-form';
import WithSpinner from '../../../components/with-spinner/withSpinner';
import { useStyles } from './styles.js';

const AuthPage = (props) => {
	const classes = useStyles();
	const { history, currentUser } = props;
	if (currentUser) {
		history.push('/dashboard');
	}
	return (
		<div className={classes.signContainer}>
			<Box p={3} fontSize="h5.fontSize" className={classes.pointerCursor} onClick={() => history.push('/')}>
				ocha
			</Box>
			<AuthForm {...props} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	isLoading: selectIsFetchingUser
});

const AuthPageConatiner = compose(connect(mapStateToProps, mapDispatchToProps), WithSpinner)(AuthPage);

export default AuthPageConatiner;
