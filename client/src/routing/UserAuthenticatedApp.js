import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserDashboard from '../pages/user/UserDashboard';
import CheckRecyclability from '../pages/shared/MarketPlace';
import Districts from '../pages/admin/Districts';
import Report from '../pages/user/Report';
import PayBills from '../pages/user/PayBills';
import ManageBags from '../pages/user/ManageBags';
import Offer from '../pages/user/Offer';
import Redeem from '../pages/user/Redeem';
import Home from '../pages/shared/home';
import Auth from '../pages/shared/auth';
import NoMatch from '../pages/shared/NoMatch';
import Bag from '../pages/admin/Bag';
import UserSettings from '../pages/user/UserSettings';

function UserAuthenticatedApp() {
  return (
    <div>
       <Router>
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={Auth} /> 
                <Route exact path="/dashboard" component={UserDashboard} />
                <Route exact path="/marketPlace" component={CheckRecyclability} />
                <Route exact path="/districts" component={Districts} />
                <Route exact path="/report" component={Report} />
                <Route exact path="/payBills" component={PayBills} />
                <Route exact path="/bags/:id" render={(props) => <Bag {...props} />} />
                <Route exact path="/manageBags" component={ManageBags} />
                <Route exact path="/offer" component={Offer} />
                <Route exact path="/redeem" component={Redeem} /> 
                <Route exact path="/settings" component={UserSettings} />  
                <Route component={NoMatch}/>
              </Switch>
        </Router >
    </div>
  );
}

export default UserAuthenticatedApp;
