import React, { Component } from 'react';
import axios from 'axios';
import "./redirect.css";
import redirectHOC from '../../utils/redierectHOC';
import getUserAttributes from "./../../utils/getUserAttributes";
import getCleanUserStore from "./../../utils/getCleanUserStore";

import {redirectUser} from "./../../services/allServices"

class Redirect extends Component {

    componentDidMount(){

        if(!this.props.getLoginStatus || !this.props.getUserAuthToken){
            return setTimeout(()=> this.props.navigate('/'), 1000);
        }
         // http get request
        /**
         * @axios snippet:
         * 
         * // send a POST request
         *      method: 'post',
         *      url: '/login',
         *      data: {
         *          firstName: 'Finn',
         *          lastName: 'Williams'
         *      }
         *      headers: {
         *          header1: content1,
         *          header2: content2
         *      }
         *  
         *    axios.get(url, data, { headers: headers})
         */
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.props.getUserAuthToken()}`
        };
        
        const user_type = (this.props.params.type).toLowerCase();

        const url = `http://localhost:3000/api/${user_type}s/me`;

        
        try{
            
            const res = redirectUser(url, headers);
            const attributes = getUserAttributes(res.data["__t"]);
                    
            const newUserStore = JSON.parse(JSON.stringify({ ...this.props.getUserStore() }));
            attributes.forEach((attribute)=> newUserStore[attribute] = res.data[attribute]);
            this.props.updateUserStore(newUserStore);
            setTimeout(() => {
                this.props.navigate("/user/dashboard");
            }, 2000);
        }
        catch(err){
            console.log(err);
            setTimeout(() => {
                const newUserStore = getCleanUserStore();
                this.props.updateUserStore(newUserStore);
                this.props.updateLoginStatus(false);
                this.props.updateUserAuthToken("");
                this.props.navigate("/fatalError");
            }, 2000);

        }
    }

    render() { 

        return (
            <center className="mt-5">
                <h4>Redirecting... Please wait...</h4><br />
                <img className='loading' src={require("./../../assets/loading.gif")} alt='a loading animation'/>
            </center>
        );
    }
}
 
export default redirectHOC(Redirect);