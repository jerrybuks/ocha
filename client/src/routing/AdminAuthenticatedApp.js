
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard';
import CheckRecyclability from '../pages/shared/CheckRecyclability';
import Regulation from '../pages/shared/Regulation';
import Report from '../pages/user/Report';
import Home from '../pages/shared/home';
import Auth from '../pages/shared/auth';
import NoMatch from '../pages/shared/NoMatch';


function AdminAuthenticatedApp() {
  return (
    <div>
       <Router>
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={Auth} /> 
                <Route exact path="/dashboard" component={AdminDashboard} />
                <Route exact path="/checkRecyclability" component={CheckRecyclability} />
                <Route exact path="/regulation" component={Regulation} />
                <Route exact path="/report" component={Report} />
                {/* <Route exact path="/offer" component={Offer} />
                <Route exact path="/redeem" component={Redeem} />  */}
                <Route component={NoMatch}/>
              </Switch>
        </Router >
    </div>
  );
}

export default AdminAuthenticatedApp;
