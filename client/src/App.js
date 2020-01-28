import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import AuthState from './context/auth/AuthState';
import StatusState from './context/status/StatusState';
import Profile from './components/pages/Profile';
import Register from './components/forms/register/Register';
import Login from './components/forms/login/Login';
import Footer from './components/layout/Footer'
import AlertState from './context/alert/AlertState';
import './App.css';
import Alert from './components/layout/Alert';


function App() {
  return (
    <AuthState>
      <StatusState>
        <AlertState>
        <div className="App">
            <Navbar/>
            <Alert/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
            <Footer />
        </div>
        </AlertState>
      </StatusState>
    </AuthState>
  );
}

export default App;
