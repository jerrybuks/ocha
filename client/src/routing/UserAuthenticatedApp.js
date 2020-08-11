import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserDashboard from '../pages/user/UserDashboard';
import CheckRecyclability from '../pages/shared/CheckRecyclability';
import Regulation from '../pages/shared/Regulation';
import Report from '../pages/user/Report';
import PayBills from '../pages/user/PayBills';
import ManageBags from '../pages/user/ManageBags';
import Offer from '../pages/user/Offer';
import Redeem from '../pages/user/Redeem';
import Home from '../pages/shared/home';
import Auth from '../pages/shared/auth';
import NoMatch from '../pages/shared/NoMatch';


function UserAuthenticatedApp() {
  return (
    <div>
       <Router>
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={Auth} /> 
                <Route exact path="/dashboard" component={UserDashboard} />
                <Route exact path="/checkRecyclability" component={CheckRecyclability} />
                <Route exact path="/regulation" component={Regulation} />
                <Route exact path="/report" component={Report} />
                <Route exact path="/payBills" component={PayBills} />
                <Route exact path="/manageBags" component={ManageBags} />
                <Route exact path="/offer" component={Offer} />
                <Route exact path="/redeem" component={Redeem} /> 
                <Route component={NoMatch}/>
              </Switch>
        </Router >
    </div>
  );
}

export default UserAuthenticatedApp;
