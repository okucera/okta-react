import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import './App.css';
import SecuredComponent from "./components/securedComponent/securedComponent";
import LoginComponent from './components/login/login';

const config = {
    issuer: 'https://dev-754855.oktapreview.com/oauth2/default',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: '0oaij4kyqnPgCVDlC0h7'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  handleLogin() {
    console.info('Handling login');
  }

    handleLogout() {
        console.info('Handling logout');
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Router>
                <Security issuer={config.issuer}
                            client_id={config.client_id}
                            redirect_uri={config.redirect_uri}>
                    <SecureRoute  path='/' exact={true} component={SecuredComponent}/>
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                    <Route path='/login' render={() => <LoginComponent/>}/>

                </Security>
            </Router>
        </header>
      </div>
    );
  }
}

export default App;
