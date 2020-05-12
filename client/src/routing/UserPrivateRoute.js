import React, { Fragment, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser, selectIsFetchingUser } from '.././redux/user/user.selectors';
import { checkUserSession } from '.././redux/user/user.actions';
import Spinner from '../components/shared/spinner/Spinner';

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
