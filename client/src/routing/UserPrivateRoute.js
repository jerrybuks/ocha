import React, { Fragment, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ checkUserSession, currentUser, isFetchingUser, component: Component, ...rest }) {
	useEffect(
		() => {
			checkUserSession();
		},
		[ checkUserSession ]
	);

	return (
		<Fragment>
			{isFetchingUser ? (
				<Spinner />
			) : (
				<Route
					{...rest}
					render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="/auth" />)}
				/>
			)}
		</Fragment>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	isFetchingUser: selectIsFetchingUser
});

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
