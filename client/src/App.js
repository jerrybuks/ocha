import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import CheckRecyclability from './components/shared/CheckRecyclability';
import Regulation from './components/shared/Regulation';
import Report from './components/user/Report';
import PayBills from './components/user/PayBills';
import PrintBarcode from './components/user/PrintBarcode';
import Offer from './components/user/Offer';
import Redeem from './components/user/Redeem';
import Home from './components/shared/Home';
import SignInAndUp from './components/shared/SignInAndUp';

function App() {
  return (
    <div className="App">
       <Router>
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signInOrUp" component={SignInAndUp} /> 
                <Route exact path="/admindashboard" component={AdminDashboard} />
                <Route exact path="/dashboard" component={UserDashboard} />
                <Route exact path="/checkRecyclability" component={CheckRecyclability} />
                <Route exact path="/regulation" component={Regulation} />
                <Route exact path="/report" component={Report} />
                <Route exact path="/payBills" component={PayBills} />
                <Route exact path="/printBarcode" component={PrintBarcode} />
                <Route exact path="/offer" component={Offer} />
                <Route exact path="/redeem" component={Redeem} /> 
                {/* <Route exact path="/login" component={Login} /> */}
              </Switch>
            </Router >
    </div>
  );
}

export default App;
