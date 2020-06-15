import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';

import { selectCurrentUser, selectIsFetchingUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Spinner from './components/shared/spinner/Spinner';

const AdminAuthenticatedApp = React.lazy(() => import('./routing/AdminAuthenticatedApp'))
const UserAuthenticatedApp = React.lazy(() => import('./routing/UserAuthenticatedApp'))
const UnAuthenticatedApp = React.lazy(() => import('./routing/UnAuthenticatedApp'))


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
				<Suspense fallback={<Spinner />}>
					{currentUser ? currentUser.isAdmin ? (
						<AdminAuthenticatedApp />
					) : (
						<UserAuthenticatedApp />
					) : (
						<UnAuthenticatedApp />
					)}
				</Suspense>
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
