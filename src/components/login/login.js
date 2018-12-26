import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Person from '../person/person';

class InnerLoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {authenticated: null};
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    async login() {
        // Redirect to '/' after login
        this.props.auth.login('/');
    }

    async logout() {
        // Redirect to '/' after logout
        this.props.auth.logout('/');
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    render() {
        if (this.state.authenticated === null) return null;
        return this.state.authenticated ?
            (
                <div>
                    <button className={"btn"} onClick={this.logout}>Logout</button>
                    <Person/>
                </div>
            )
            :
            <button className={"btn"} onClick={this.login}>Login</button>;
    }
}

const LoginComponent = withAuth(InnerLoginComponent);
export default LoginComponent;