import { Component } from "react";
import { Link } from "react-router-dom";
import countryDropdown from "./../../utils/countryDropdown";

import redirectHOC from "../../utils/redierectHOC";
import getCleanUserStore from "../../utils/getCleanUserStore";
import {registerUser} from "../../services/allServices";
class Register extends Component {

    state = {
        userInput: {
            email: "",
            password: "",
            repassword: "",
            firstName: "",
            lastName: "",
            nickname: "",
            prefix: "",
            dateOfBirth: "",
            sex: "",
            mobileNo: "",
            bankAccountNo: "",
            addressLine1: "",
            addressLine2: "",
            city: "", 
            state: "", 
            zipCode: "", 
            country: "",
            nationality: "",
            clientId: Date.now(), 
        },
    };


    handleChange = (event) => {
        let userInput = {...this.state.userInput};
        userInput[event.target.name] = event.target.value;
        this.setState({userInput: userInput});
    };

    handleSubmit = async (event) => {
        event.preventDefault();

         // http post request
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
         *    axios.post(url, data, { headers: headers})
         */
        const { email, password, firstName, lastName, nickname, prefix, dateOfBirth, sex,
             mobileNo, bankAccountNo, addressLine1, addressLine2, city, state, zipCode, country, nationality, clientId } = this.state.userInput;
        
        const data = {
            password: password,
            email: email,
            name: {
                firstName: firstName,
                lastName: lastName,
                nickname: nickname, 
            },
            prefix: prefix,
            dateOfBirth: dateOfBirth,
            sex: sex,
            mobileNo: mobileNo,
            bankAccountNo: bankAccountNo,
            address: {
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city, 
                state: state, 
                zipCode: zipCode, 
                country: country,
            },
            nationality: nationality,
            clientId: clientId 
        };

        const url = 'http://localhost:3000/api/clients/createClient';

        const headers = {
            'Content-Type': 'application/json',
        };

        try {

            const res = await registerUser(url, data, headers);
    
            let newUserStore = JSON.parse(JSON.stringify({...this.props.getUserStore()}));
            newUserStore._id = res.data['_id'];
            this.props.updateUserStore(newUserStore);
            this.props.updateLoginStatus(true);
            this.props.updateUserAuthToken(res.headers['x-auth-token']);
    
            // save token to local storage and redirect user
            localStorage.setItem('token', res.headers['x-auth-token']);
            this.props.navigate('/login/redirect/');
        }
        catch(err){
            console.log(err);
            this.props.updateLoginStatus(false);
            this.props.updateUserAuthToken("");
            this.props.updateUserStore(getCleanUserStore());
            localStorage.removeItem('token');

        }

    };


    render(){
        let { email, password, firstName, lastName, nickname, 
            prefix, dateOfBirth, sex, mobileNo, bankAccountNo, addressLine1, 
            addressLine2, city, state, zipCode, country, nationality, repassword } = this.state.userInput;
        return ( 
            <div className="container">
                <center>Already a member? <Link to="/login">Login</Link>!</center>
                <hr />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset>
                        <legend>Basic Credentials</legend>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={(event)=> this.handleChange(event)} placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={(event)=> this.handleChange(event)} placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repassword">Confirm Password</label>
                            <input type="password" className="form-control" name="repassword" value={repassword} onChange={(event)=> this.handleChange(event)} placeholder="Confirm password"/>
                        </div>
                    </fieldset>
                    <hr />
                    <fieldset>
                        <legend>Personal Information</legend>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name="firstName" value={firstName} onChange={(event)=> this.handleChange(event)} placeholder="Kaylor Dimitri"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" value={lastName} onChange={(event)=> this.handleChange(event)} placeholder="Navas"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="nickname">Nickname</label>
                                    <input type="text" className="form-control" name="nickname" value={nickname} onChange={(event)=> this.handleChange(event)} placeholder="Dimitri"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="prefix">Prefix</label>
                                    <input type="text" className="form-control" name="prefix" value={prefix} onChange={(event)=> this.handleChange(event)} placeholder="Mr/Mrs/Ms"/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                            <input type="date" className="form-control" name="dateOfBirth" value={dateOfBirth} onChange={(event)=> this.handleChange(event)}></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Sex</label>
                            <div className="form-control">
                                <center>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="sex"  value="Male" onChange={(event)=> this.handleChange(event)} checked={sex==="Male"}/>
                                    <label className="form-check-label" htmlFor="sex">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="sex"  value="Female" onChange={(event)=> this.handleChange(event)} checked={sex==="Female"}/>
                                    <label className="form-check-label" htmlFor="sex">Female</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="sex" value="Other" onChange={(event)=> this.handleChange(event)} checked={sex==="Other"}/>
                                    <label className="form-check-label" htmlFor="sex">Other</label>
                                </div>
                                </center>
                            </div>
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>      
        
                            <select name="nationality"  value={nationality} onChange={(event)=> this.handleChange(event)} className="form-control">
                                {countryDropdown()}
                            </select>
                        </div>



                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="mobileNo">Mobile Number</label>
                                    <input type="text" className="form-control" name="mobileNo" value={mobileNo} onChange={(event)=> this.handleChange(event)} placeholder="Include country code"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="bankAccountNo">Bank Account Number</label>
                                    <input type="text" className="form-control" name="bankAccountNo" value={bankAccountNo} onChange={(event)=> this.handleChange(event)} placeholder="e.g. 1054871654287"/>
                                </div>
                            </div>
                        </div>

                    </fieldset>
                    

                    

                    <hr />

                    <fieldset>
                        <legend>Permanent Address</legend>
                        <div className="form-group">
                            <label htmlFor="addressLine1">Address Line 1*</label>
                            <input type="text" className="form-control" name="addressLine1" value={addressLine1} onChange={(event)=> this.handleChange(event)} placeholder="Address line 1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressLine2">Address Line 2</label>
                            <input type="text" className="form-control" name="addressLine2" value={addressLine2} onChange={(event)=> this.handleChange(event)} placeholder="Address line 2"/>
                        </div>
                        <small>*Use comma ( , ) to seperate each segment</small><br />

                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" name="city" value={city} onChange={(event)=> this.handleChange(event)} placeholder="City"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input type="text" className="form-control" name="state" value={state} onChange={(event)=> this.handleChange(event)} placeholder="State"/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="number" className="form-control" name="zipCode" value={zipCode} onChange={(event)=> this.handleChange(event)} placeholder="Zip Code"/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="country">Country of Residence</label>      
        
                            <select name="country" value={country} onChange={(event)=> this.handleChange(event)} className="form-control">
                                {countryDropdown()}
                            </select>
                        </div>

                    </fieldset>

                    <hr />
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" name="toc"/>
                        <label className="form-check-label" htmlFor="toc">By signing up, I agree to iOrphan's <Link to="/toc">Terms of Service and Conditions of Use</Link>.</label>
                    </div>
                    <center>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </center>
                </form>
            </div>
        );
    }
}
 
export default redirectHOC(Register);