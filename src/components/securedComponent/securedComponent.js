import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Person from '../person/person';

class InnerSecuredComponent extends Component {
    constructor(props) {
        super(props);
        console.info('hello');
        this.state={authenticated:false};
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        const token = await this.props.auth.getAccessToken();
        console.info('authenticated: ' + authenticated);
        console.info('token: ' + token);
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    render() {
        return (
                <div>
                    <h1>Security enabled</h1>
                    <Person/>
                </div>
        );
    }
}

const SecuredComponent = withAuth(InnerSecuredComponent);
export default SecuredComponent;