import React, { Component } from 'react';
import axios from 'axios';
import redirectHOC from '../../utils/redierectHOC';

import {userLogin} from "./../../services/allServices";

class Login extends Component{

    state = {
        userInput: {
            email: "",
            password: "",
        },
    };

    handleChange = (event) => {
        let userInput = {...this.state.userInput};
        userInput[event.target.name] = event.target.value;
        this.setState({userInput: userInput});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        /** TODO: validate errors and if no errors continue */

        const data = JSON.parse(JSON.stringify({ ...this.state.userInput }));
        const url = 'http://localhost:3000/api/clientAuth';
        const headers = {
            'Content-Type': 'application/json'
        };

        try{
            const res = await userLogin(url, data, headers);
            this.props.updateLoginStatus(true)
            this.props.updateUserAuthToken(res.headers['x-auth-token']);

            localStorage.setItem('token', res.headers['x-auth-token']);
            this.props.navigate(`/login/redirect/${res.headers['x-user-type']}`);
        }catch(err){
            console.log(err);
            this.props.updateLoginStatus(false);
            this.props.updateUserAuthToken("");
            localStorage.removeItem('token');
        }
        
    };

    render(){
        return ( 
            <div className="container">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset>
                        <legend>Login</legend>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" value={this.state.userInput.email} onChange={(event)=> this.handleChange(event)} placeholder="Enter email"/>
                            <small name="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.userInput.password} onChange={(event)=> this.handleChange(event)} placeholder="Password"/>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="loggedIn"/>
                            <label className="form-check-label" htmlFor="loggedIn">Keep me logged in</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div> 
        );
    }
}
 
export default redirectHOC(Login);