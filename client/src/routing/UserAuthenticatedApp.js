import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserDashboard from '../components/user/UserDashboard';
import CheckRecyclability from '../components/shared/CheckRecyclability';
import Regulation from '../components/shared/Regulation';
import Report from '../components/user/Report';
import PayBills from '../components/user/PayBills';
import PrintBarcode from '../components/user/PrintBarcode';
import Offer from '../components/user/Offer';
import Redeem from '../components/user/Redeem';
import Home from '../components/shared/home';
import Auth from '../components/shared/auth';
import NoMatch from '../components/shared/NoMatch';


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
                <Route exact path="/printBarcode" component={PrintBarcode} />
                <Route exact path="/offer" component={Offer} />
                <Route exact path="/redeem" component={Redeem} /> 
                <Route component={NoMatch}/>
              </Switch>
        </Router >
    </div>
  );
}

export default UserAuthenticatedApp;
