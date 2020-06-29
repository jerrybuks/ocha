import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/shared/home';
import Auth from '../pages/shared/auth';

export default function UnAuthenticatedApp() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/auth" component={Auth} />
					<Route render={() => <Redirect to={{ pathname: '/auth' }} />} />
				</Switch>
			</Router>
		</div>
	);
}
