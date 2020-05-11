import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminDashboard from '.././components/admin/AdminDashboard';
import UserDashboard from '.././components/user/UserDashboard';
import CheckRecyclability from '.././components/shared/CheckRecyclability';
import Regulation from '.././components/shared/Regulation';
import Report from '.././components/user/Report';
import PayBills from '.././components/user/PayBills';
import PrintBarcode from '.././components/user/PrintBarcode';
import Offer from '.././components/user/Offer';
import Redeem from '.././components/user/Redeem';
import Home from '.././components/shared/home';
import Auth from '.././components/shared/auth';
import UserPrivateRoute from './UserPrivateRoute'

function Routes() {
  return (
    <div className="App">
       <Router>
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={Auth} /> 
                <Route exact path="/admindashboard" component={AdminDashboard} />
                <UserPrivateRoute exact path="/dashboard" component={UserDashboard} />
                <UserPrivateRoute exact path="/checkRecyclability" component={CheckRecyclability} />
                <UserPrivateRoute exact path="/regulation" component={Regulation} />
                <UserPrivateRoute exact path="/report" component={Report} />
                <UserPrivateRoute exact path="/payBills" component={PayBills} />
                <UserPrivateRoute exact path="/printBarcode" component={PrintBarcode} />
                <UserPrivateRoute exact path="/offer" component={Offer} />
                <UserPrivateRoute exact path="/redeem" component={Redeem} /> 
                {/* <Route exact path="/login" component={Login} /> */}
              </Switch>
        </Router >
    </div>
  );
}

export default Routes;
