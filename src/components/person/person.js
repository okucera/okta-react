import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

class InnerPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try {
            const obj = {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin':'',
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + await this.props.auth.getAccessToken()
                }
            };
            const response = await fetch('https://remaxfinance.herokuapp.com/api/person/1', obj);

            const data = await response.json();
            this.setState({person: data})
        } catch (e) {
            console.error("ERROR: " + e);
        }
    }

    render() {
        if(!this.state.person) return <div>Loading...</div>;
        return <div>user: {this.state.person.forename}</div>
    }
}

const Person = withAuth(InnerPerson);

export default Person;