
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminDashboard from '../components/admin/AdminDashboard';
import CheckRecyclability from '../components/shared/CheckRecyclability';
import Regulation from '../components/shared/Regulation';
import Report from '../components/user/Report';
import Home from '../components/shared/home';
import Auth from '../components/shared/auth';
import NoMatch from '../components/shared/NoMatch';


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
