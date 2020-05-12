import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import UserAuthenticatedApp from './routing/UserAuthenticatedApp';

import AdminAuthenticatedApp from './routing/AdminAuthenticatedApp';
import UnAuthenticatedApp from './routing/UnAuthenticatedApp';

import { selectCurrentUser, selectIsFetchingUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Spinner from './components/shared/spinner/Spinner';

function App({ checkUserSession, currentUser, isFetchingUser }) {
	useEffect(
		() => {
      console.log("I ran ooh")
			checkUserSession();
		},
		[ checkUserSession ]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{isFetchingUser ? (
				<Spinner />
			) : (
				<div>
					{currentUser ? currentUser.isAdmin ? (
						<AdminAuthenticatedApp />
					) : (
						<UserAuthenticatedApp />
					) : (
						<UnAuthenticatedApp />
					)}
				</div>
			)}
		</ThemeProvider>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	isFetchingUser: selectIsFetchingUser
});

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
